import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

import { useHistory } from "react-router-dom";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import Icon from "@mui/material/Icon";
import SuiTypography from "components/SuiTypography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from '@mui/material/Skeleton';
import { useSnackbar } from 'notistack';
// Soft UI Dashboard React components
import { useDispatch, useSelector } from "react-redux";
import { setItemDetail } from "redux/action/itemAction";
import { pages } from "links/pages";
// Service
import { deleteAlert } from "_services";
import { getItemDetail, getItemDelete, getVendorUpdate, getVendorDelete } from "../service";
import { Temp } from '../model/list';
import AddVendor from './addVendor';
import UpdateVendor from './updateVendor';
// import VendUpdate from "view/main/vend/view/update";

function ItemView() {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [isModalOpen, setModal] = useState({ add: false, update: false, vend: {} });
    const itemData = useSelector(state => state.itemDetail);
    const dispatch = useDispatch();
    const { id, name } = useSelector(state => state.navPath["curr"]);
    const { Status } = Temp;

    async function loadData() {
        await getItemDetail(id)
            .then((res) => {
                if (res.flag) {
                    dispatch(setItemDetail(res.data));
                }
            });
    }

    const handleAddModal = () => {
        setModal({
            ...isModalOpen,
            add: false
        });
    };
    const handleUpdateModal = () => {
        setModal({
            ...isModalOpen,
            update: false,
            vend: {}
        });
    };
    useEffect(() => {
        if (id !== undefined) {
            loadData();
        }
        return () => dispatch(setItemDetail({}));
    }, [id]);


    const updateItem = () => {
        history.push({
            pathname: pages.ITEM_UPDATE,
            search: "?" + (name.replace(" ", "-").toLowerCase()),
            state: {
                id,
                name
            }
        });
    }

    const deleteItem = () => {
        const deleteHandle = async () => {
            return getItemDelete(id);
        }
        deleteAlert({ title: "Are you sure?" }, deleteHandle)
            .then((res) => {
                if (res === null) {
                    return;
                }
                if (res.flag) {
                    enqueueSnackbar("Item delete success", {
                        variant: 'success',
                    });
                    history.push({
                        pathname: pages.ITEM_LIST,
                    });
                } else {
                    enqueueSnackbar("Item delete failed", {
                        variant: 'error',
                    });
                }
            });
    }

    const deleteVendor = (vid) => {
        const deleteHandle = async () => {
            return getVendorDelete(vid);
        }
        deleteAlert({ title: "Are you sure?" }, deleteHandle)
            .then((res) => {
                if (res === null) {
                    return;
                }
                if (res.flag) {
                    enqueueSnackbar("Item's vendor delete success", {
                        variant: 'success',
                    });
                    dispatch(setItemDetail({
                        ...itemData,
                        vends: itemData.vends.filter(ven => ven.id !== vid)
                    }));
                } else {
                    enqueueSnackbar("Item's vendor delete failed", {
                        variant: 'error',
                    });
                }
            });
    }
    const openVenderUpdate = (vend) => {
        setModal({
            ...isModalOpen,
            update: true,
            vend: { ...vend }
        });
        // console.log(isModalOpen,vend);
    }
    const updateVendor = (vend, sprice) => {
        getVendorUpdate(vend.id, { sp: sprice })
            .then((res) => {
                if (res.flag) {
                    enqueueSnackbar("Item's vendor update success", {
                        variant: 'success',
                    });
                    dispatch(setItemDetail({
                        ...itemData,
                        vends: itemData.vends.map((ven) => ven.id === vend.id ? { ...res.data } : ven)
                    }));
                } else {
                    enqueueSnackbar("Item's vendor update failed", {
                        variant: 'error',
                    });
                }
                handleUpdateModal();
            });
    }

    if (Object.keys(itemData).length === 0) {
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
                        <Skeleton animation="wave" variant="text" width="20%" height={30} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="text" width="80%" height={30} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="text" width="70%" height={30} />
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
                            {itemData.name}
                        </SuiTypography>
                        <Box display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                            <Box mr={1}>
                                <SuiButton buttonColor="error" onClick={deleteItem}>
                                    <Icon className="material-icons-round">delete</Icon>&nbsp;&nbsp;delete
                                </SuiButton>
                            </Box>
                            <SuiButton buttonColor="dark" onClick={updateItem}>
                                <Icon className="material-icons-round">edit</Icon>&nbsp;&nbsp;edit
                            </SuiButton>
                        </Box>
                    </Box>
                    <Grid container>
                        <Grid item xs={12} lg={3}>
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
                                    src={itemData.image}
                                    style={{ margin: "auto", width: "100%", height: "auto" }}
                                />
                            </SuiBox>
                        </Grid>
                        <Grid item xs={12} lg={9}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Code
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{itemData.code}
                                    </SuiTypography>
                                </Grid>

                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Available
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{itemData.avi_qty}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Min Qty
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{itemData.min_qty}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Selling Price
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{itemData.sprice}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Expire Time
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{itemData.expire_time}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Create At
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :&nbsp;&nbsp;{itemData.create_at}
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiTypography fontWeight="regular">
                                        Status
                                    </SuiTypography>
                                </Grid>
                                <Grid item xs={9}>
                                    <SuiTypography fontWeight="medium">
                                        :<Status status={itemData.status} />
                                    </SuiTypography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </SuiBox>

            <SuiBox
                backgroundColor="white"
                borderRadius="lg"
                p={3}
                mb={1}
                mt={2}
            >
                <Grid container spacing={1}>
                    <Grid item xs={9} lg={10}>
                        <SuiTypography fontWeight="bold" textColor="secondary" textTransform="uppercase">
                            Vendor List
                        </SuiTypography>
                    </Grid>
                    <Grid item xs={3} lg={2}>
                        <SuiButton buttonColor="success" onClick={() => { setModal({ ...isModalOpen, add: true }) }}>
                            Add
                        </SuiButton>
                    </Grid>
                    <Grid item xs={12}>
                        {itemData.vends.map((val, index) => {
                            return (
                                <Grid container spacing={2} key={"vendor" + index}>
                                    <Grid item xs={6}>
                                        <SuiTypography fontWeight="regular">
                                            {val.name}
                                        </SuiTypography>
                                    </Grid>
                                    <Grid item xs={3} lg={4}>
                                        <SuiTypography fontWeight="regular">
                                            {val.price}
                                        </SuiTypography>
                                    </Grid>
                                    <Grid item xs={3} lg={2}>
                                        <SuiButton iconOnly={true} size="small" buttonColor="info" onClick={() => openVenderUpdate(val)}>
                                            <Icon className="material-icons-round">edit</Icon>
                                        </SuiButton>
                                        <SuiButton style={{ marginLeft: "5px" }} iconOnly={true} size="small" buttonColor="error" onClick={() => deleteVendor(val.id)}>
                                            <Icon className="material-icons-round">delete</Icon>
                                        </SuiButton>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </SuiBox>
            <AddVendor isOpen={isModalOpen.add} handleClose={handleAddModal} id={id} callBack={loadData} />
            <UpdateVendor isOpen={isModalOpen.update} vendModal={isModalOpen.vend} handleClose={handleUpdateModal} callBack={updateVendor} />
        </>
    );
}




export default ItemView;
