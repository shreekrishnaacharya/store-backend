import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

import { useHistory } from "react-router-dom";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import Icon from "@mui/material/Icon";
import SuiTypography from "components/SuiTypography";
import Grid from "@mui/material/Grid";
import Skeleton from '@mui/material/Skeleton';
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
// Soft UI Dashboard React components
import { useSelector } from "react-redux";
import { customerPage, salesPage } from "links/pages";
import userIcon from 'assets/images/user.png';
import Table from "layouts/Table";
// Service
import { deleteAlert } from "_services";
import { getCustomerDetail, getCustomerDelete } from "../service";
import { Temp } from '../model/list';
import { columns, modelList, modelListInit, modelListEmpty } from "../model/transaction";

function CustomerView() {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [customerData, setCustomer] = useState({});
    const { id, name } = useSelector(state => state.navPath["curr"]);
    const { Status, Contacts } = Temp;

    async function loadData() {
        await getCustomerDetail(id)
            .then((res) => {
                if (res.flag) {
                    setCustomer(res.data);
                }
            });
    }

    useEffect(() => {
        if (id !== undefined) {
            loadData();
        }
        return () => setCustomer({});
    }, [id]);

    const handleSalesView = (id, name) => {
        history.push({
            pathname: salesPage.SALES_VIEW,
            search: "?" + (name.replace(" ", "-").toLowerCase()),
            state: {
                id,
                name
            }
        });
    }

    const updateCustomer = () => {
        history.push({
            pathname: customerPage.CUSTOMER_UPDATE,
            search: "?" + (name.replace(" ", "-").toLowerCase()),
            state: {
                id,
                name
            }
        });
    }

    const deleteCustomer = () => {
        const deleteHandle = async () => {
            return getCustomerDelete(id);
        }
        deleteAlert({ title: "Are you sure?" }, deleteHandle)
            .then((res) => {
                if (res === null) {
                    return;
                }
                if (res.flag) {
                    enqueueSnackbar("Customer delete success", {
                        variant: 'success',
                    });
                    history.push({
                        pathname: customerPage.CUSTOMER_LIST,
                    });
                } else {
                    enqueueSnackbar("Customer delete failed", {
                        variant: 'error',
                    });
                }
            });
    }

    if (Object.keys(customerData).length === 0) {
        return (<>
            <SuiBox
                component="li"
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                backgroundColor="white"
                borderRadius="lg"
                p={3}
                mb={1}
                mt={2}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" variant="text" width="30%" height={30} />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Skeleton style={{ margin: "10px" }} animation="wave" variant="rectangular" width="100%" height={"100%"} />
                    </Grid>
                    <Grid item xs={12} lg={9}>
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
            <SuiTypography fontWeight="bold" textColor="secondary" textTransform="uppercase">
                Transaction
            </SuiTypography>
            <Table columns={columns} rows={modelListInit()} />
        </>)
    }

    const TableRender = () => {
        if (customerData.bills.length == 0) {
            return (
                <div>
                    <Table columns={columns} rows={modelListEmpty()} />
                </div>
            );
        } else {
            return (
                <div>
                    <Table columns={columns} rows={modelList(customerData.bills, handleSalesView)} />
                </div>
            );
        }
    }
    return (
        <>
            <SuiBox
                component="li"
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
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
                        <SuiTypography fontWeight="bold" textColor="primary" textTransform="uppercase">
                            {customerData.name}
                        </SuiTypography>
                        <Box display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                            <Box mr={1}>
                                <SuiButton buttonColor="error" onClick={deleteCustomer}>
                                    <Icon className="material-icons-round">delete</Icon>&nbsp;&nbsp;delete
                                </SuiButton>
                            </Box>
                            <SuiButton buttonColor="dark" onClick={updateCustomer}>
                                <Icon className="material-icons-round">edit</Icon>&nbsp;&nbsp;edit
                            </SuiButton>
                        </Box>
                    </Box>
                    <Grid container>
                        <Grid item xs={3}>
                            <SuiBox
                                style={{ border: "1px solid #eee", height: "100%", display: "flex" }}
                                borderRadius="lg"
                                boxShadow="sm"
                                p={1}
                                m={4}
                                mt={0}
                                mb={1}
                            >
                                <img
                                    src={customerData.contacts ? customerData.contacts.image : userIcon}
                                    style={{ margin: "auto", width: "100%", height: "auto" }}
                                />
                            </SuiBox>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Address
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{customerData.address}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Balance
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{customerData.balance}
                                    </SuiTypography>
                                </Grid>

                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Create At
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{customerData.create_at}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Status
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :<Status status={customerData.status} />
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Contacts contacts={customerData.contacts ? customerData.contacts.contacts : []} />
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
                    Transaction
                </SuiTypography>
                <TableRender />
            </Box>
        </>
    );
}

export default CustomerView;
