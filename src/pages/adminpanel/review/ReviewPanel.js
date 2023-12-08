import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { connect } from 'react-redux';

import ReplyModal from './ReplyModal';
import { getReviewData, actionReview, submitReply, actionDeleteReview } from '../../../redux/admin/actions';
import { fDate } from '../../../utils/formatTime';

function Row(props) {
    const { row } = props;

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {row.user.name}
                </TableCell>
                <TableCell align="center">{row.user.email}</TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.content}</TableCell>
                <TableCell align="center">{fDate(row.createdAt)}</TableCell>
                <TableCell align="center"><Chip label={row.status==="active"?"Posted":"Not Posted"} color={`${row.status === 'active' ? 'success' : 'primary'}`} variant="outlined" /></TableCell>
                <TableCell align="center" sx={{whiteSpace: "nowrap"}}>
                    <Button 
                        onClick={() => props.onAction(row._id, row.status)} 
                        style={{ color: 'white', backgroundColor: `${row.status === 'active' ? 'gray' : 'green'}` }}
                    >
                        {row.status === 'active' ? 'Cancel' : 'Post'}
                    </Button>
                    <Button sx={{ml: 1}} onClick={() => props.onDelete(row._id, row.status)} style={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
                </TableCell>
                <TableCell align="center">
                    {row.reply ? row.reply.content : <Button onClick={() => props.onReply(row._id)}>Reply</Button>}
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
const ReviewPanel = ({
    getReviewData,
    actionReview,
    submitReply, 
    actionDeleteReview
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectId, setSelectId] = useState('');

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getDataHandler(newPage, rowsPerPage);
    };
    const getDataHandler = (page, rowsPerPage) => {
        getReviewData({
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

        actionReview({ id, tmp }, res => {
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
        // console.log("success...");
        actionDeleteReview({ id, tmp }, res => {
            if (res.success) {
                getDataHandler(page, rowsPerPage)
            }
        })
    }

    const handleClose = () => {
        setOpen(!open);
    }

    useEffect(() => {
        getDataHandler(page, rowsPerPage);
    }, []);
    const onReply = id => {
        setSelectId(id);
        setOpen(true);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getDataHandler(0, parseInt(event.target.value, 10));
    };
    const onSubmit = (data) => {
        submitReply(data, res => {
            if (res.success) {
                setSelectId('');
                setOpen(false);
                getDataHandler(page, rowsPerPage);
            }
        })
    }
    return (
        <>
            <TableContainer component={Paper} sx={{ width: 'auto', backgroundColor:"#ffffff05" }}>
                <Table aria-label="collapsible table" sx={{ minWidth: 750 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Content</TableCell>
                            <TableCell align="center">Created At</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                            <TableCell align="center">Reply</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <Row 
                                key={row._id} 
                                row={row} 
                                onReply={(id) => onReply(id)} 
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
            <ReplyModal open={open} handleClose={handleClose} onSubmit={onSubmit} id={selectId}/>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getReviewData: (data, cb) => dispatch(getReviewData(data, cb)),
    actionReview: (data, cb) => dispatch(actionReview(data, cb)),
    submitReply: (data, cb) => dispatch(submitReply(data, cb)),
    actionDeleteReview: (data, cb) => dispatch(actionDeleteReview(data, cb)),
    
    
})
export default connect(null, mapDispatchToProps)(ReviewPanel);