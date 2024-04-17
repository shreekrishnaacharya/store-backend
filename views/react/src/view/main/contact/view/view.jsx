import { useEffect } from "react";
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
import { useSnackbar } from 'notistack';
// Soft UI Dashboard React components
import { useDispatch, useSelector } from "react-redux";
import { setContactDetail } from "redux/action/contactAction";
import { contactPage } from "links/pages";
// Service
import { deleteAlert } from "_services";
import { getContactDetail, getContactDelete } from "../service";
import { Temp } from '../model/list';

function ContactView() {
    console.log("contact view");
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const contactData = useSelector(state => state.contactDetail);
    const dispatch = useDispatch();
    const { id, name } = useSelector(state => state.navPath["curr"]);
    const { Status, Contacts } = Temp;

    async function loadData() {
        await getContactDetail(id)
            .then((res) => {
                if (res.flag) {
                    dispatch(setContactDetail(res.data));
                }
            });
    }

    useEffect(() => {
        if (id !== undefined) {
            loadData();
        }
        return () => dispatch(setContactDetail({}));
    }, [id]);

    const updateContact = () => {
        history.push({
            pathname: contactPage.CONTACT_UPDATE,
            search: "?" + (name.replace(" ", "-").toLowerCase()),
            state: {
                id,
                name
            }
        });
    }

    const deleteContact = () => {
        const deleteHandle = async () => {
            return getContactDelete(id);
        }
        deleteAlert({ title: "Are you sure?" }, deleteHandle)
            .then((res) => {
                if (res === null) {
                    return;
                }
                if (res.flag) {
                    enqueueSnackbar("Contact delete success", {
                        variant: 'success',
                    });
                    history.push({
                        pathname: contactPage.CONTACT_LIST,
                    });
                } else {
                    enqueueSnackbar("Contact delete failed", {
                        variant: 'error',
                    });
                }
            });

    }

    if (Object.keys(contactData).length === 0) {
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
                            {contactData.name}
                        </SuiTypography>
                        <SuiBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                            <SuiBox mr={1}>
                                <SuiButton buttonColor="error" onClick={deleteContact}>
                                    <Icon className="material-icons-round">delete</Icon>&nbsp;&nbsp;delete
                                </SuiButton>
                            </SuiBox>
                            <SuiButton buttonColor="dark" onClick={updateContact}>
                                <Icon className="material-icons-round">edit</Icon>&nbsp;&nbsp;edit
                            </SuiButton>
                        </SuiBox>
                    </SuiBox>
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
                                    src={contactData.image}
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
                                        :&nbsp;&nbsp;{contactData.address}
                                    </SuiTypography>
                                </Grid>

                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Create At
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{contactData.create_at}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Status
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :<Status status={contactData.status} />
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Contacts contacts={contactData.contacts} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SuiBox>
            </SuiBox>
        </>
    );
}

export default ContactView;
