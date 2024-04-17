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
import { useSnackbar } from 'notistack';
import { useSelector } from "react-redux";
// Soft UI Dashboard React components
import { customerPage } from "links/pages";
// Service
import { deleteAlert } from "_services";
import { getCustomerDetail, getCustomerDelete } from "../service";
import { Temp } from '../model/list';

function CustomerView() {
    const [customerData, setCustomer] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const { id, name } = useSelector(state => state.navPath["curr"]);
    const { Status } = Temp;

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
                    <Grid item xs={12} lg={12}>
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
                <SuiBox width="100%" display="flex" flexDirection="column">
                    <SuiBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        flexDirection={{ xs: "column", sm: "row" }}
                        mb={2}
                    >
                        <SuiTypography fontWeight="bold" textColor="primary" textTransform="uppercase">
                            {customerData.name}
                        </SuiTypography>
                        <SuiBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                            <SuiBox mr={1}>
                                <SuiButton buttonColor="error" onClick={deleteCustomer}>
                                    <Icon className="material-icons-round">delete</Icon>&nbsp;&nbsp;delete
                                </SuiButton>
                            </SuiBox>
                            <SuiButton buttonColor="dark" onClick={updateCustomer}>
                                <Icon className="material-icons-round">edit</Icon>&nbsp;&nbsp;edit
                            </SuiButton>
                        </SuiBox>
                    </SuiBox>
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
                                Remark
                            </SuiTypography>
                        </Grid>
                        <Grid item xs={9}>
                            <SuiTypography fontWeight="medium">
                                :&nbsp;&nbsp;{customerData.remark}
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
                    </Grid>
                </SuiBox>
            </SuiBox>
        </>
    );
}

export default CustomerView;
