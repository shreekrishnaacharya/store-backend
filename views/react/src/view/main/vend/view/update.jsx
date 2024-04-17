// Soft UI Dashboard React example components
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { vendPage } from "links/pages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setVendDetail } from "redux/action/vendAction";
import VendForm from "./_form";
// Custom styles for the Tables

// Service
import { updateVend, getVendDetail } from "../service"

const schema = yup.object({
    image: yup.mixed().test("fileSize", "Max file size is 1MB", (value, ob1) => {
        return !value || value[0].size < 1200000;
    }).test("type", "Only jpg,jpeg and png are supported", (value) => {
        return !value || (value[0].type === "image/jpeg" || value[0].type === "image/jpg" || value[0].type === "image/png");
    }),
    name: yup.string().required("Name cannot be blank").max(100),
    address: yup.string().required("Address cannot be blank").max(100),
    contact_person: yup.string().required("Contact Person cannot be blank").max(100),
    contacts: yup.array()
        .min(1, "Create at least customer")
        .of(yup.object().shape({
            type: yup.string("Type must be string").required("Type is required"),
            phone: yup.number("Phone must be number").required("Phone is required")
        })),
});

function VendUpdate() {
    const { enqueueSnackbar } = useSnackbar();
    const [vendData, setVendor] = useState({});
    const { id, name } = useSelector(state => state.navPath["curr"]);
    const history = useHistory();
    async function loadData() {
        await getVendDetail(id)
            .then((res) => {
                if (res.flag) {
                    const vdData = res.data;
                    reset({
                        name: vdData.name,
                        address: vdData.address,
                        contact_person: vdData.contact_person,
                        image: null,
                        img: vdData.image,
                        contacts: vdData.contacts ? vdData.contacts.contacts : []
                    }, {
                        keepDirty: true
                    });
                }
            });
    }
    useEffect(() => {
        if (Object.keys(vendData).length === 0 && id !== undefined) {
            loadData();
        }
        return () => setVendor({});
    }, []);

    const { handleSubmit, control, getValues, reset } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        keepDirty: true,
        defaultValues: useMemo(() => {
            return {
                name: vendData.name,
                address: vendData.address,
                contact_person: vendData.contact_person,
                image: null,
                img: vendData.image,
                contacts: vendData.contacts ? vendData.contacts.contacts : []
            };
        }, [vendData])
    });

    async function onSubmitHandler(data) {
        await updateVend(id, data).then((res) => {
            if (res.flag) {
                enqueueSnackbar("Vendor update success", {
                    variant: 'success',
                });
                setVendor(res.data);
                history.push({
                    pathname: vendPage.VEND_VIEW,
                    search: "?" + (name.replace(" ", "-").toLowerCase()),
                    state: {
                        id,
                        name
                    }
                });
            } else {
                enqueueSnackbar("Vendor update failed", {
                    variant: 'error',
                });
            }
        });
    };
    return (
        <VendForm
            onSubmitHandler={onSubmitHandler}
            handleSubmit={handleSubmit}
            control={control}
            isNewVend={false}
            getValues={getValues}
        />
    );
}

export default VendUpdate;