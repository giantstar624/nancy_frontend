import React, { useEffect, useState, useRef } from 'react';
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
import {TextField} from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import GetAppIcon from '@mui/icons-material/GetApp';

import { getUserData, actionReview, actionActiveUser, actionBlockUser, actionAddChat, actionDeleteUser } from '../../../redux/admin/actions';
import { fDate } from '../../../utils/formatTime';
import { setRoomId } from '../../../redux/chat/actions';

function Row(props) {
    const { row, no } = props;

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="left">{no + 1}</TableCell>
                <TableCell component="th" scope="row">{row.firstname}</TableCell>
                <TableCell component="th" scope="row">{row.lastname}</TableCell>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="center">{fDate(row.createdAt)}</TableCell>
                <TableCell align="center"><Chip label={row.status==="active"?"Not Blocked":"Blocked"} color={`${row.status === 'active' ? 'success' : 'primary'}`} variant="outlined" /></TableCell>
                <TableCell align="center" sx={{whiteSpace: "nowrap"}}>
                    <Button 
                        onClick={() => props.onAction(row._id, row.status)} 
                        style={{ color: 'white', backgroundColor: `${row.status === 'active' ? 'gray' : 'green'}` }}
                    >
                        {row.status === 'active' ? 'Block' : 'UnBlock'}
                    </Button>

                    <Button sx={{ml: 1}} onClick={() => props.onDelete(row._id, row.status)} style={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
                </TableCell>
                <TableCell align="center">
                    <Button sx={{ml: 1}} onClick={() => props.onChat(row._id, row.status)} style={{ color: 'white', backgroundColor: 'green' }}>Chat</Button>
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
const UserPanel = ({
    getUserData,
    actionActiveUser,
    actionBlockUser,
    actionDeleteUser,
    actionAddChat,
    submitReply
}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tableRef = useRef(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectId, setSelectId] = useState('');
    const [search, setSearch] = useState('');

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getDataHandler(newPage, rowsPerPage);
    };
    const getDataHandler = (page, rowsPerPage, search = "") => {
        getUserData({
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
            actionActiveUser({id}, res => {
                if(res.success) {
                    getDataHandler(page, rowsPerPage);
                }
            });
        } else {
            actionBlockUser({id}, res => {
                if(res.success) {
                    getDataHandler(page, rowsPerPage);
                }
            });
            
        }
    }

    const onDelete = (id, status) => {

        console.log("asdf");
        actionDeleteUser({id}, res => {
            if(res.success) {
                getDataHandler(page, rowsPerPage);
            }
        });
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleSearch = () => {
        setPage(0);
        getDataHandler(0, rowsPerPage, search);
    }

    useEffect(() => {
        getDataHandler(page, rowsPerPage);
    }, []);

    const onChat = (id, status) => {
        if(status === "blocked") {
            alert("This user is blocked");
            return;
        }
        
        actionAddChat(id, res => {
            if (res.success) {
                dispatch(setRoomId(id));
                navigate('/dashboard/chat');
            }
        })
    }

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
                <TextField
                    placeholder="Search ..."
                    variant="outlined"
                    type={"text"}
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    sx={{ width: "200px", textAlign:"right" }}
                    multiline
                    maxRows={2}
                />
                <Button sx={{ml: 1}} onClick={handleSearch} style={{ color: 'white', backgroundColor: '#0888a0' }}>Search</Button>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    textAlign: "right",
                    display: "block"
                }}
            >
                <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >
                    <Button > <GetAppIcon/>Export excel </Button>
                </DownloadTableExcel>
            </Box>

            <TableContainer component={Paper} sx={{ width: 'auto', backgroundColor:"#ffffff05" }}>
                <Table 
                    aria-label="collapsible table" 
                    sx={{ minWidth: 750 }} 
                    ref={tableRef}
                    options={{
                        exportButton: true,
                        exportAllData: true
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">FirstName</TableCell>
                            <TableCell align="left">LastName</TableCell>
                            <TableCell align="left">UserName</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="center">Created At</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                            <TableCell align="center">Chat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <Row 
                                key={row._id} 
                                no = {index} 
                                row={row} 
                                onChat={(id, status) => onChat(id, status)} 
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
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getUserData: (data, cb) => dispatch(getUserData(data, cb)),
    actionReview: (data, cb) => dispatch(actionReview(data, cb)),
    actionActiveUser: (data, cb) => dispatch(actionActiveUser(data, cb)),
    actionBlockUser: (data, cb) => dispatch(actionBlockUser(data, cb)),
    actionDeleteUser: (data, cb) => dispatch(actionDeleteUser(data, cb)),
    actionAddChat:(data, cb) => dispatch(actionAddChat(data, cb)),
})
export default connect(null, mapDispatchToProps)(UserPanel);