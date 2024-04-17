
// Soft UI Dashboard React example components
import { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { pages } from "links/pages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setItemDetail } from "redux/action/itemAction";
import ItemForm from "./_form";
// Custom styles for the Tables

// Service
import { updateItem, getItemDetail } from "../service"

const schema = yup.object({
    image: yup.mixed().test("fileSize", "Max file size is 1MB", (value, ob1) => {
        return !value || value[0].size < 1200000;
    }).test("type", "Only jpg,jpeg and png are supported", (value) => {
        return !value || (value[0].type === "image/jpeg" || value[0].type === "image/jpg" || value[0].type === "image/png");
    }),
    name: yup.string().required().max(100).label('Name'),
    code: yup.string().required().max(100).label('Code'),
    min_qty: yup.number().positive().integer().required().label('Min Qty'),
    expire_time: yup.number().positive().integer().label('Life must'),
    sprice: yup.number().positive().required().label('Selling price'),
    qty_typ: yup.number().positive().required().label('Unit Type')
});

function ItemUpdate() {
    const { enqueueSnackbar } = useSnackbar();
    const itemData = useSelector(state => state.itemDetail);
    const { id, name } = useSelector(state => state.navPath["curr"]);
    const history = useHistory();
    const dispatch = useDispatch();
    async function loadData() {
        await getItemDetail(id)
            .then((res) => {
                if (res.flag) {
                    const itData = res.data;
                    reset({
                        name: itData.name,
                        code: itData.code,
                        sprice: itemData.sprice,
                        min_qty: itData.min_qty,
                        expire_time: itData.expire_time,
                        qty_typ: itData.qty_typ,
                        image: null,
                        img_view: itData.image
                    }, {
                        keepDirty: true
                    });
                }
            });
    }
    useEffect(() => {
        if (Object.keys(itemData).length === 0 && id !== undefined) {
            loadData();
        }
        return () => dispatch(setItemDetail({}));
    }, []);


    const { reset, ...restForm } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        keepDirty: true,
        defaultValues: useMemo(() => {
            return {
                name: itemData.name,
                code: itemData.code,
                sprice: itemData.sprice,
                min_qty: itemData.min_qty,
                expire_time: itemData.expire_time,
                qty_typ: itemData.qty_typ,
                image: null,
                img_view: itemData.image
            };
        }, [itemData])
    });

    async function onSubmitHandler(data) {
        await updateItem(id, data).then((res) => {
            if (res.flag) {
                enqueueSnackbar("Item update success", {
                    variant: 'success',
                });
                dispatch(setItemDetail(res.data));
                history.push({
                    pathname: pages.ITEM_VIEW,
                    search: "?" + (name.replace(" ", "-").toLowerCase()),
                    state: {
                        id,
                        name
                    }
                });
            } else {
                enqueueSnackbar("Item update failed", {
                    variant: 'error',
                });
            }
        });
    };
    return (
        <ItemForm
            {...restForm}
            onSubmitHandler={onSubmitHandler}
            isNewItem={false}
        />
    );
}

export default ItemUpdate;
