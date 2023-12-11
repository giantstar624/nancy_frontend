import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Stack, Button, FormLabel, TextField, Grid, Box } from '@mui/material';
import PropTypes from 'prop-types';
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
import { useTheme, styled } from '@mui/material/styles';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { fDate } from '../../../utils/formatTime';
import { getPromoData, submitPromo, actionPromo, actionDeletePromo, setPromoTag } from '../../../redux/admin/actions';
import config from '../../../utils/config';

const StyledContent = styled('div')(({ theme }) => ({
    margin: 'auto',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
}));

function Row(props) {
    const { row } = props;

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {row.user.name}
                </TableCell>
                <TableCell align="center"><img alt="" style={{ width: 120, }} src={`${config.server}:${config.port}/promoImg/${row?.image}`} /></TableCell>
                <TableCell align="center">{row.content}</TableCell>
                <TableCell align="center" component="th" scope="row">{fDate(row.createdAt)}</TableCell>
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    <Chip label={row.status} color={`${row.status === 'show' ? 'success' : 'primary'}`} variant="outlined" />
                    <Chip sx={{ ml: 1 }} label={row.showTag ? "Tagged" : "Untagged"} color={`${row.showTag ? 'success' : 'primary'}`} variant="outlined" />
                </TableCell>
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    <Button
                        onClick={() => props.onAction(row._id, row.status)}
                        style={{ color: 'white', backgroundColor: `${row.status === 'hide' ? 'green' : 'gray'}` }}
                    >
                        {row.status === 'show' ? 'hide' : 'show'}
                    </Button>
                    <Button
                        onClick={() => props.onTag(row._id, row.showTag)}
                        style={{ color: 'white', backgroundColor: `${!row.showTag ? 'green' : 'gray'}` }}
                        sx={{ ml: 1 }}
                    >
                        {row.showTag ? 'Untag' : 'Tag'}
                    </Button>
                    <Button sx={{ ml: 1 }} onClick={() => props.onDelete(row._id, row.status)} style={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
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

const PromotionPanel = ({
    submitPromo,
    getPromoData,
    actionPromo,
    setPromoTag,
    actionDeletePromo
}) => {
    const [promo, setPromo] = useState({
        file: null,
        content: ''
    })
    const [imageUrl, setImageUrl] = useState(null);
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
        getPromoData({
            page,
            row: rowsPerPage
        }, res => {
            if (res.success) {
                setTotal(res.total);
                setData(res.promos);
            }
        })
    }
    const onAction = (id, status) => {
        let tmp = ''
        if (status === "hide")
            tmp = "show";
        else tmp = "hide";

        actionPromo({ id, tmp }, res => {
            if (res.success) {
                getDataHandler(page, rowsPerPage)
            }
        })
    }
    const onTag = (id, showTag) => {
        const tmp = !showTag;
        setPromoTag({ id, tmp }, res => {
            if (res.success) {
                getDataHandler(page, rowsPerPage)
            }
        });
    }

    const onDelete = (id, status) => {

        actionDeletePromo({ id }, res => {
            if (res.success) {
                getDataHandler(page, rowsPerPage)
            }
        })
    }


    const handleChange = e => setPromo({ ...promo, content: e.target.value });

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getDataHandler(0, parseInt(event.target.value, 10));
    };
    const onSubmit = () => {
        submitPromo(promo, res => {
            if (res.success) {
                setPromo({ file: null, content: '' })
                getDataHandler(page, rowsPerPage);
            }
        })
    }
    const handleCreatePromo = () => {
        if (promo.file && promo.content.length > 0)
            onSubmit();
    }
    const handleCancel = () => setPromo({ file: null, content: '' });

    useEffect(() => {
        getDataHandler(page, rowsPerPage);
    }, [])
    useEffect(() => {
        if (promo.file) {
            setImageUrl(URL.createObjectURL(promo.file));
        }
    }, [promo]);



    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={3} sm={12} xs={12}>
                    <Stack direction="row" spacing={2} style={{ border: '2px solid #2065D1', borderRadius: 5, paddingTop: 10, paddingBottom: 10 }}>

                        <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            style={{ display: "none" }}
                            onChange={(e) => setPromo({ ...promo, file: e.target.files[0] })}
                        />
                        <FormLabel htmlFor="select-image">
                            <Button variant="contained" color="primary" component="span">
                                Upload Image
                            </Button>
                        </FormLabel>
                        {imageUrl && promo.file && (
                            <Stack mt={2} textAlign="center">
                                <img src={imageUrl} alt={promo.file.name} height="100px" />
                            </Stack>
                        )}
                    </Stack>
                    <StyledContent>
                        <TextField
                            id="outlined-multiline-static"
                            label="Content"
                            multiline
                            rows={6}
                            value={promo.content}
                            onChange={handleChange}
                        />
                    </StyledContent>
                    <StyledContent>
                        <Grid container spacing={2}>
                            <Grid item md={6}><Button fullWidth style={{ backgroundColor: 'green', color: 'white' }} onClick={handleCreatePromo}>Create</Button></Grid>
                            <Grid item md={6}><Button fullWidth variant="contained" color="primary" component="span" onClick={handleCancel}>Cancel</Button></Grid>
                        </Grid>
                    </StyledContent>
                </Grid>
                <Grid item md={9} sm={12} xs={12}>
                    <TableContainer component={Paper} sx={{ width: 'auto', backgroundColor: "#ffffff05" }}>
                        <Table aria-label="collapsible table" sx={{ minWidth: 750 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">User</TableCell>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Content</TableCell>
                                    <TableCell align="center">Created At</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <Row
                                        key={row._id}
                                        row={row}
                                        onAction={(id, status) => onAction(id, status)}
                                        onDelete={(id, status) => onDelete(id, status)}
                                        onTag={(id, status) => onTag(id, status)}
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
                </Grid>
            </Grid>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getPromoData: (data, cb) => dispatch(getPromoData(data, cb)),
    submitPromo: (data, cb) => dispatch(submitPromo(data, cb)),
    actionPromo: (data, cb) => dispatch(actionPromo(data, cb)),
    setPromoTag: (data, cb) => dispatch(setPromoTag(data, cb)),
    actionDeletePromo: (data, cb) => dispatch(actionDeletePromo(data, cb)),

})

export default connect(null, mapDispatchToProps)(PromotionPanel);