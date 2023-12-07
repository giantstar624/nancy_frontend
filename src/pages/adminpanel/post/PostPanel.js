import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { connect } from 'react-redux';

import { getPostDatas, actionPost, actionDeletePost } from '../../../redux/admin/actions';
import { fDate } from '../../../utils/formatTime';
import config from '../../../utils/config';

function createData(name, email, content, createdAt, status, comment) {
    return {
        name,
        email,
        content,
        createdAt,
        status,
        comment
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" style={{width: '20% !important'}}>
                    {row.user?.name}
                </TableCell>
                <TableCell align="center">{row.user?.email}</TableCell>
                <TableCell align="center"><img alt="" style={{ width: 120, }} src={`${config.server}:${config.port}/postImg/${row.image}`} /></TableCell>
                <TableCell align="center">{row.content}</TableCell>
                <TableCell align="center">{fDate(row.createdAt)}</TableCell>
                <TableCell align="center"><Chip label={row.status==="active"?"Posted":"Not posted"} color={`${row.status === 'active' ? 'success' : 'primary'}`} variant="outlined" /></TableCell>
                <TableCell align="center" sx={{whiteSpace: "nowrap"}}>
                    <Button onClick={() => props.onAction(row._id, row.status)} style={{ color: 'white', backgroundColor: `${row.status === 'active' ? 'grey' : 'green'}` }}>{row.status === 'active' ? 'Cancel' : 'Post'}</Button>
                    <Button sx={{ml: 1}} onClick={() => props.onDelete(row._id, row.status)} style={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Comments
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {row.comment.map((comment, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {comment.content}
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}



function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
const PostPanel = ({
    getPostData,
    actionPost,
    actionDeletePost
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getDataHandler(newPage, rowsPerPage);
    };
    const getDataHandler = (page, rowsPerPage) => {
        getPostData({
            page,
            row: rowsPerPage
        }, res => {
            if (res.success) {
                setTotal(res.total);
                setData(res.posts);
            }
        })
    }
    const onAction = (id, status) => {
        let tmp = ''
        if (status === "active")
            tmp = "pending";
        else tmp = "active";

        actionPost({ id, tmp }, res => {
            if (res.success) {
                getDataHandler(page, rowsPerPage)
            }
        })
    }

    const onDelete = (id, status) => {
        let tmp = ''
        if (status === "active")
            tmp = "pending";
        else tmp = "active";

        actionDeletePost({ id, tmp }, res => {
            if (res.success) {
                getDataHandler(page, rowsPerPage)
            }
        })
    }


    useEffect(() => {
        getDataHandler(page, rowsPerPage);
    }, [])
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getDataHandler(0, parseInt(event.target.value, 10));
    };
    return (
        <>
            <TableContainer component={Paper} sx={{ width: 'auto', backgroundColor:"#ffffff05" }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align='center'>Image</TableCell>
                            <TableCell align='center'>Content</TableCell>
                            <TableCell align='center'>Created At</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <Row 
                                key={row._id} 
                                row={row} 
                                onAction={(id, status) => onAction(id, status)} 
                                onDelete={(id, status) => onDelete(id, status)}
                            />
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: 1000000 }]}
                    colSpan={1000}
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableContainer>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getPostData: (data, cb) => dispatch(getPostDatas(data, cb)),
    actionPost: (data, cb) => dispatch(actionPost(data, cb)),
    actionDeletePost: (data, cb) => dispatch(actionDeletePost(data, cb)),
})
export default connect(null, mapDispatchToProps)(PostPanel);