import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import Icon from "@mui/material/Icon";
import SuiTypography from "components/SuiTypography";
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import { useSnackbar } from 'notistack';
// Soft UI Dashboard React components
import { useSelector } from "react-redux";
import { purchasePage } from "links/pages";
// Service
import { deleteAlert } from "_services";
import { getPurchaseDetail, getPurchaseDelete, getAddPayment } from "../service";
import { Temp } from '../model/list';
import AddPayment from './addPayment';

function PurchaseView() {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [purData, setPurData] = useState({});
    const [isModalOpen, setModal] = useState({ add: false, update: false, purc: {} });
    const { id, name } = useSelector(state => state.navPath["curr"]);
    const { Status, Pstatus } = Temp;

    async function loadData() {
        await getPurchaseDetail(id)
            .then((res) => {
                if (res.flag) {
                    setPurData(res.data);
                }
            });
    }

    useEffect(() => {
        if (id !== undefined) {
            loadData();
        }
        return () => setPurData({});
    }, [id]);

    const handleAddPayment = () => {
        setModal({
            ...isModalOpen,
            add: false
        });
    };

    const addPayment = (amount) => {
        getAddPayment(purData.id, { amount: amount })
            .then((res) => {
                if (res.flag) {
                    enqueueSnackbar("Payment add success", {
                        variant: 'success',
                    });
                    loadData();
                } else {
                    enqueueSnackbar("Payment add failed", {
                        variant: 'error',
                    });
                }
                handleAddPayment();
            });
    }

    const handleReturn = () => {
        history.push({
            pathname: purchasePage.PURCHASE_RETURN,
            search: "?" + (name.replace(" ", "-").toLowerCase()),
            state: {
                id,
                name
            }
        });
    }
    const deletePurchase = () => {
        const deleteHandle = async () => {
            return getPurchaseDelete(id);
        }
        deleteAlert({ title: "Are you sure?" }, deleteHandle)
            .then((res) => {
                if (res === null) {
                    return;
                }
                if (res.flag) {
                    enqueueSnackbar("Purchase delete success", {
                        variant: 'success',
                    });
                    history.push({
                        pathname: purchasePage.PURCHASE_LIST,
                    });
                } else {
                    enqueueSnackbar("Purchase delete failed", {
                        variant: 'error',
                    });
                }
            });
    }


    if (Object.keys(purData).length === 0) {
        return (<>
            <SuiBox
                backgroundColor="white"
                borderRadius="lg"
                p={3}
                mb={1}
                mt={2}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="text" width="30%" height={30} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="text" width="20%" height={30} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="text" width="40%" height={30} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="text" width="20%" height={30} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </SuiBox>
        </>)
    }
    let totalQty = 0;

    return (
        <>
            <SuiBox
                backgroundColor="white"
                borderRadius="lg"
                p={3}
                mb={1}
                mt={2}
            >
                <Box width="100%" display="flex" flexDirection="column">
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        flexDirection={{ xs: "column", sm: "row" }}
                        mb={2}
                    >
                        <Box display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                            {purData.total_amt != purData.pay_amt && (
                                <Box mr={1}>
                                    <SuiButton buttonColor="success" onClick={() => (setModal({ ...isModalOpen, add: true }))}>
                                        <Icon className="material-icons-round">paid</Icon>&nbsp;&nbsp;Add
                                    </SuiButton>
                                </Box>
                            )}
                            {purData.status != 3 && purData.has_return != 1 && (
                                <Box mr={1}>
                                    <SuiButton buttonColor="warning" onClick={handleReturn}>
                                        <Icon className="material-icons-round">assignment_return</Icon>&nbsp;&nbsp;Return
                                    </SuiButton>
                                </Box>
                            )}
                            <Box mr={1}>
                                <SuiButton buttonColor="error" onClick={deletePurchase}>
                                    <Icon className="material-icons-round">delete</Icon>&nbsp;&nbsp;delete
                                </SuiButton>
                            </Box>
                        </Box>
                    </Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={4} lg={2}>
                                    <SuiTypography fontWeight="regular">
                                        Date
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{purData.date}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={4} lg={2}>
                                    <SuiTypography fontWeight="regular">
                                        Ref. No
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{purData.ref_no}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={4} lg={2}>
                                    <SuiTypography fontWeight="regular">
                                        Order Status
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;<Status status={purData.status} />
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={4} lg={2}>
                                    <SuiTypography fontWeight="regular">
                                        Vendor
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{purData.vend}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={4} lg={2}>
                                    <SuiTypography fontWeight="regular">
                                        Pay Status
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;<Pstatus status={purData.pstatus} />
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={4} lg={2}>
                                    <SuiTypography fontWeight="regular">
                                        Shipping
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{purData.shipping}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={4} lg={2}>
                                    <SuiTypography fontWeight="regular">
                                        Pay Terms
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{purData.pym_term + " " + (purData.pym_term > 1 ? "days" : "day")}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={4} lg={2}>
                                    <SuiTypography fontWeight="regular">
                                        Store
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{purData.store}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={4} lg={2}>
                                    <SuiTypography fontWeight="regular">
                                        Create At
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{purData.create_at}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={4} lg={2}>
                                    <SuiTypography fontWeight="regular">
                                        Create By
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{purData.create_by}
                                    </SuiTypography>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </SuiBox>
            <Box
                mb={1}
                mt={2}
            >
                <SuiTypography fontWeight="bold" textColor="secondary" textTransform="uppercase">
                    Items List
                </SuiTypography>
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <TableHead style={{ backgroundColor: "#eee" }}>
                            <TableRow>
                                <TableCell>
                                    <SuiTypography variant="subtitle2" component="div">Name</SuiTypography>
                                </TableCell>
                                <TableCell style={{ width: "10%", textAlign: "right" }}>
                                    <SuiTypography variant="subtitle2" component="div">Net Unit Cost</SuiTypography>
                                </TableCell>
                                <TableCell style={{ width: "12%", textAlign: "right" }}>
                                    <SuiTypography variant="subtitle2" component="div">Quantity</SuiTypography>
                                </TableCell>
                                <TableCell style={{ width: "15%", textAlign: "right" }}>
                                    <SuiTypography variant="subtitle2" component="div">Total</SuiTypography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purData.pitems.map((cont, index) => {
                                totalQty += parseFloat(cont.qty);
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <SuiTypography variant="body2" component="div">{cont.name}</SuiTypography>
                                        </TableCell>
                                        <TableCell style={{ textAlign: "right" }}>
                                            <SuiTypography variant="body2" component="div">{cont.rate}</SuiTypography>
                                        </TableCell>
                                        <TableCell style={{ textAlign: "right" }}>
                                            <SuiTypography variant="body2" component="div">{cont.qty}</SuiTypography>
                                        </TableCell>
                                        <TableCell style={{ textAlign: "right" }}>
                                            <SuiTypography variant="body2" component="div">{cont.rate * cont.qty}</SuiTypography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        <Box component="tfoot">
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <SuiTypography variant="subtitle2" component="div">Total</SuiTypography>
                                </TableCell>
                                <TableCell style={{ textAlign: "right" }}>
                                    <SuiTypography variant="subtitle2" component="div">{totalQty}</SuiTypography>
                                </TableCell>
                                <TableCell style={{ textAlign: "right" }}>
                                    <SuiTypography variant="subtitle2" component="div">{purData.amt}</SuiTypography>
                                </TableCell>
                            </TableRow>
                            <TableRow style={{ border: "none" }}>
                                <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                    <SuiTypography variant="subtitle2" component="div">Discount ({purData.dis_per}%)</SuiTypography>
                                </TableCell>
                                <TableCell style={{ textAlign: "right" }}>
                                    {purData.dis_amt}
                                </TableCell>
                            </TableRow>
                            <TableRow style={{ border: "none" }}>
                                <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                    <SuiTypography variant="subtitle2" component="div">Vat ({purData.vat_rate}%)</SuiTypography>
                                </TableCell>
                                <TableCell style={{ textAlign: "right" }}>
                                    {purData.vat_amt}
                                </TableCell>
                            </TableRow>
                            {purData.rchg && (
                                <TableRow style={{ border: "none" }}>
                                    <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                        <SuiTypography variant="subtitle2" component="div">Return Surcharge</SuiTypography>
                                    </TableCell>
                                    <TableCell style={{ textAlign: "right" }}>
                                        {purData.rchg}
                                    </TableCell>
                                </TableRow>
                            )}
                            <TableRow style={{ border: "none" }}>
                                <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                    <SuiTypography variant="subtitle2" component="div">Grand Total</SuiTypography>
                                </TableCell>
                                <TableCell style={{ textAlign: "right" }}>
                                    {purData.total_amt}
                                </TableCell>
                            </TableRow>
                            <TableRow style={{ border: "none" }}>
                                <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                    <SuiTypography variant="subtitle2" component="div">Paid</SuiTypography>
                                </TableCell>
                                <TableCell style={{ textAlign: "right" }}>
                                    {purData.pay_amt}
                                </TableCell>
                            </TableRow>
                            <TableRow style={{ border: "none" }}>
                                <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                    <SuiTypography variant="subtitle2" component="div">Balance</SuiTypography>
                                </TableCell>
                                <TableCell style={{ textAlign: "right" }}>
                                    {(purData.total_amt - purData.pay_amt).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </Box>
                    </Table>
                </TableContainer>
            </Box >
            <Box
                mb={1}
                mt={2}
            >
                <SuiTypography fontWeight="bold" textColor="secondary" textTransform="uppercase">
                    Payments
                </SuiTypography>
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <TableHead style={{ backgroundColor: "#eee" }}>
                            <TableRow>
                                <TableCell>
                                    <SuiTypography variant="subtitle2" component="div">SNO</SuiTypography>
                                </TableCell>
                                <TableCell>
                                    <SuiTypography variant="subtitle2" component="div">Date</SuiTypography>
                                </TableCell>
                                <TableCell>
                                    <SuiTypography variant="subtitle2" component="div">Amount</SuiTypography>
                                </TableCell>
                                <TableCell>
                                    <SuiTypography variant="subtitle2" component="div">Added By</SuiTypography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purData.payments.map((pay, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <SuiTypography variant="body2" component="div">{index + 1}</SuiTypography>
                                        </TableCell>
                                        <TableCell >
                                            <SuiTypography variant="body2" component="div">{pay.cat}</SuiTypography>
                                        </TableCell>
                                        <TableCell>
                                            <SuiTypography variant="body2" component="div">{pay.amt}</SuiTypography>
                                        </TableCell>
                                        <TableCell>
                                            <SuiTypography variant="body2" component="div">{pay.name}</SuiTypography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box >
            <AddPayment isOpen={isModalOpen.add} purModel={purData} handleClose={handleAddPayment} callBack={addPayment} />
        </>
    );
}

export default PurchaseView;
