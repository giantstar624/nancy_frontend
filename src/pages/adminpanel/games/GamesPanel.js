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
import AddIcon from '@mui/icons-material/Add';
import { connect, useSelector, useDispatch } from 'react-redux';

import {
    getGames,
    updateGameIcon,
    updateGameUrl,
    createGame,
    deleteGame
} from '../../../redux/admin/actions';
import { fDate } from '../../../utils/formatTime';
import config from '../../../utils/config';
import GameAddModal from '../../../components/supportadd/GameAddModal';

function Row(props) {
    const { row } = props;
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align='center'>
                   {props.index}
                </TableCell>
                <TableCell align="center">
                    <img alt="" style={{ width: 120, }} src={`${config.server}:${config.port}/games/${row.image}`} />
                </TableCell>
                <TableCell>
                    {row.url}
                </TableCell>
                <TableCell align="center" sx={{whiteSpace: "nowrap"}}>
                    <Button onClick={() => props.onUpdateIcon(row._id, row.status)} style={{ color: 'white', backgroundColor: `#869400` }}>Update Icon</Button>
                    <Button sx={{ml: 1, mr:1}} onClick={() => props.onUpdateUrl(row._id, row.status)} style={{ color: 'white', backgroundColor: `#869400` }}>Update Url</Button>
                    <Button onClick={() => props.onDelete(row._id, row.status)} style={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
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
const GamesPanel = ({
    getGames,
    updateGameIcon,
    updateGameUrl,
    createGame,
    deleteGame
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [image, setImage] = useState(null); 
    const [imageUrl, setImageUrl] = useState(null);
    const [url, setUrl] = useState('');

    const dispatch = useDispatch();
    const adminModule = useSelector((state) => state.adminModule);
    const games = adminModule.games;

    const [open, setOpen] = useState(false);
    const [uploadType, setUploadType] = useState("new");
    const [updateId, setUpdateId] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getDataHandler(newPage, rowsPerPage);
    };
    const getDataHandler = () => {
        getGames();
    }

    const onDelete = (id, status) => {
        deleteGame(id, res => {
            if (res.success) {
                getDataHandler()
            }
        })
    }

    const onAction = () =>{

        console.log(uploadType);

        if(uploadType === "new") {   
            createGame({image, url}, res=>{
                // console.log("success");
                setOpen(false);
            })
        } else if(uploadType === "update-icon") {
            updateGameIcon({ updateId, image }, res => {
                setOpen(false);
            })
        }
        else {
            updateGameUrl({ updateId, url }, res => {
                setOpen(false);
            })
        }
    }

    useEffect(() => {
        getDataHandler();
    }, [])

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getDataHandler(0, parseInt(event.target.value, 10));
    };

    const onOpenUploadModal = (type, id) => {
        setUpdateId(id);
        setUploadType(type);
        setOpen(true);
    }

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
                <Button sx={{ml: 1}} onClick={()=>onOpenUploadModal("new")} style={{ color: 'white', backgroundColor: '#0888a0' }}><AddIcon/>Add Game</Button>
            </Box>
            <TableContainer component={Paper} sx={{ width: 'auto', backgroundColor:"#ffffff05" }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games.map((row, index) => (
                            <Row 
                                index = {index+1}
                                key={row._id} 
                                row={row} 
                                onUpdateIcon={(id, status) => onOpenUploadModal("update-icon", id)} 
                                onUpdateUrl={(id, status) => onOpenUploadModal("update-url", id)} 
                                onDelete={(id, status) => onDelete(id, status)}
                            />
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: 1000000 }]}
                    colSpan={1000}
                    count={games.length}
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
            
            <GameAddModal 
                open={open} 
                handleClose={()=>setOpen(false)} 
                onSend={onAction}
                image={image}
                setImage={setImage}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                url={url}
                setUrl={setUrl}
                uploadType={uploadType}
            />
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getGames: () => dispatch(getGames()),
    updateGameIcon: (data, cb) => dispatch(updateGameIcon(data, cb)),
    updateGameUrl: (data, cb) => dispatch(updateGameUrl(data, cb)),
    createGame: (data, cb) => dispatch(createGame(data, cb)),
    deleteGame: (data, cb) => dispatch(deleteGame(data, cb)),
})
export default connect(null, mapDispatchToProps)(GamesPanel);