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
import AddIcon from '@mui/icons-material/Add';
import {TextField} from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { 
    getSupportData,  
    actionDeleteSupport,
    actionActiveSupport, 
    actionBlockSupport,
    actionRegisterAgent
} from '../../../redux/admin/actions';

import { fDate } from '../../../utils/formatTime';
import { setRoomId } from '../../../redux/chat/actions';
import { onShowAlert } from '../../../redux/user/actions';
import SupportAddModal from '../../../components/supportadd/SupportAddModal';

function Row(props) {
    const { row, no } = props;

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="left">{no + 1}</TableCell>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="center">{fDate(row.createdAt)}</TableCell>
                <TableCell align="center"><Chip label={row.status==="active"?"Active":"Blocked"} color={`${row.status === 'active' ? 'success' : 'primary'}`} variant="outlined" /></TableCell>
                <TableCell align="center" sx={{whiteSpace: "nowrap"}}>
                    <Button 
                        onClick={() => props.onAction(row._id, row.status)} 
                        style={{ color: 'white', backgroundColor: `${row.status === 'active' ? '#bd4dbf' : 'gray'}` }}
                    >
                        {row.status === 'active' ? 'Block' : 'UnBlock'}
                    </Button>
                    <Button 
                        onClick={() => props.onDelete(row._id, row.status)} 
                        style={{ color: 'white', backgroundColor: `red`, marginLeft:"5px" }}
                    >
                        Delete
                    </Button>
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
const ManagePanel = ({
    getSupportData,
    actionBlockSupport,
    actionActiveSupport,
    actionRegisterAgent,
    actionDeleteSupport
}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getDataHandler(newPage, rowsPerPage);
    };
    const getDataHandler = (page, rowsPerPage, search = "") => {
        getSupportData({
            page,
            row: rowsPerPage, 
            search
        }, res => {
            if (res.success) {
                setTotal(res.total);
                setData(res.users);
            }
        })
    }
    const onAction = (id, status) => {

        if (status === "blocked") {
            actionActiveSupport({id}, res => {
                if(res.success) {
                    getDataHandler(page, rowsPerPage);
                }
            });
        } else {
            actionBlockSupport({id}, res => {
                if(res.success) {
                    getDataHandler(page, rowsPerPage);
                }
            });
            
        }
    }

    const onDelete = (id, status) => {

        actionDeleteSupport(id, res => {
            if(res.success) {
                getDataHandler(page, rowsPerPage);
            }
            dispatch(onShowAlert(res.msg, res.success));
        });
    }

    const onAddAgent = (name, email, password) => {
        setPage(0);
        actionRegisterAgent({name, email, password}, res => {
            if(res.success) {
                getDataHandler(page, rowsPerPage);
            }
            dispatch(onShowAlert(res.msg, res.success));
        });
    }

    useEffect(() => {
        getDataHandler(page, rowsPerPage);
    }, []);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getDataHandler(0, parseInt(event.target.value, 10));
    };

    return (
        <>
            <Box 
                sx={{
                    width:"100%",
                    display:"flex",
                    justifyContent: "end",
                    mb: 1,
                    mt: 1
                }}
            >
                <Button sx={{ml: 1}} onClick={()=>setOpen(true)} style={{ color: 'white', backgroundColor: '#0888a0' }}><AddIcon/>Add Agent</Button>
            </Box>
            <TableContainer component={Paper} sx={{ width: 'auto', backgroundColor:"#ffffff05" }}>
                <Table aria-label="collapsible table" sx={{ minWidth: 750 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="center">Created At</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <Row 
                                key={row._id} 
                                no = {index} 
                                row={row} 
                                onAction={(id, status) => onAction(id, status)} 
                                onDelete={(id, status) => onDelete(id, status)} 
                            />
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100, { label: 'All', value: 1000000 }]}
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
            <SupportAddModal open={open} handleClose={()=>setOpen(false)} onSend={onAddAgent}/>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getSupportData: (data, cb) => dispatch(getSupportData(data, cb)),
    actionDeleteSupport: (data, cb) => dispatch(actionDeleteSupport(data, cb)),
    actionBlockSupport: (data, cb) => dispatch(actionBlockSupport(data, cb)),
    actionActiveSupport: (data, cb) => dispatch(actionActiveSupport(data, cb)),
    actionRegisterAgent: (data, cb) => dispatch(actionRegisterAgent(data, cb)),
    
})
export default connect(null, mapDispatchToProps)(ManagePanel);