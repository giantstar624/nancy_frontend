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
    getBanners,
    updateBanner,
    createBanner,
    deleteBanner
} from '../../../redux/admin/actions';
import { fDate } from '../../../utils/formatTime';
import config from '../../../utils/config';
import BannerAddModal from '../../../components/supportadd/BannerAddModal';

function Row(props) {
    const { row } = props;
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align='center'>
                   {props.index}
                </TableCell>
                <TableCell align="center">
                    <img alt="" style={{ width: 120, }} src={`${config.server}:${config.port}/banner/${row.url}`} />
                </TableCell>
                <TableCell align="center" sx={{whiteSpace: "nowrap"}}>
                    <Button onClick={() => props.onUpdate(row._id, row.status)} style={{ color: 'white', backgroundColor: `green` }}>Update</Button>
                    <Button sx={{ml: 1}} onClick={() => props.onDelete(row._id, row.status)} style={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
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
const BannerPanel = ({
    getBanners,
    updateBanner,
    createBanner,
    deleteBanner
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [image, setImage] = useState(null); 
    const [imageUrl, setImageUrl] = useState(null);

    const dispatch = useDispatch();
    const adminModule = useSelector((state) => state.adminModule);
    const banners = adminModule.banners;

    const [open, setOpen] = useState(false);
    const [uploadType, setUploadType] = useState("new");
    const [updateId, setUpdateId] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getDataHandler(newPage, rowsPerPage);
    };
    const getDataHandler = () => {
        getBanners();
    }

    const onDelete = (id, status) => {
        deleteBanner(id, res => {
            if (res.success) {
                getDataHandler()
            }
        })
    }

    const onCreateBanner = () =>{

        if(uploadType === "new") {   
            createBanner(image, res=>{
                console.log("success");
                setOpen(false);
            })
        } else {
            updateBanner({ updateId, image }, res => {
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
                <Button sx={{ml: 1}} onClick={()=>onOpenUploadModal("new")} style={{ color: 'white', backgroundColor: '#0888a0' }}><AddIcon/>Add Banner</Button>
            </Box>
            <TableContainer component={Paper} sx={{ width: 'auto', backgroundColor:"#ffffff05" }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {banners.map((row, index) => (
                            <Row 
                                index = {index+1}
                                key={row._id} 
                                row={row} 
                                onUpdate={(id, status) => onOpenUploadModal("update", id)} 
                                onDelete={(id, status) => onDelete(id, status)}
                            />
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: 1000000 }]}
                    colSpan={1000}
                    count={banners.length}
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
            
            <BannerAddModal 
                open={open} 
                handleClose={()=>setOpen(false)} 
                onSend={onCreateBanner}
                image={image}
                setImage={setImage}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                uploadType={uploadType}
            />
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getBanners: () => dispatch(getBanners()),
    updateBanner: (data, cb) => dispatch(updateBanner(data, cb)),
    createBanner: (data, cb) => dispatch(createBanner(data, cb)),
    deleteBanner: (data, cb) => dispatch(deleteBanner(data, cb)),
})
export default connect(null, mapDispatchToProps)(BannerPanel);