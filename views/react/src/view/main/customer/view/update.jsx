
// Soft UI Dashboard React example components
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { customerPage } from "links/pages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import CustomerForm from "./_form";
// Custom styles for the Tables

// Service
import { updateCustomer, getCustomerDetail } from "../service"

const schema = yup.object({
    image: yup.mixed().test("fileSize", "Max file size is 1MB", (value, ob1) => {
        return !value || value[0].size < 1200000;
    }).test("type", "Only jpg,jpeg and png are supported", (value) => {
        return !value || (value[0].type === "image/jpeg" || value[0].type === "image/jpg" || value[0].type === "image/png");
    }),
    name: yup.string().required("Name cannot be blank").max(100),
    address: yup.string().max(100),
    contacts: yup.array()
        .min(1, "Create at least customer")
        .of(yup.object().shape({
            type: yup.string("Type must be string").required("Type is required"),
            phone: yup.number("Phone must be number").required("Phone is required")
        })),
});

function CustomerUpdate() {
    const { enqueueSnackbar } = useSnackbar();
    const [customerData, setCustomer] = useState({});
    const { id, name } = useSelector(state => state.navPath["curr"]);
    const history = useHistory();
    async function loadData() {
        await getCustomerDetail(id)
            .then((res) => {
                if (res.flag) {
                    const itData = res.data;
                    reset({
                        name: itData.name,
                        address: itData.address,
                        image: null,
                        img: itData.image,
                        contacts: itData.contacts ? itData.contacts.contacts : []
                    }, {
                        keepDirty: true
                    });
                }
            });
    }
    useEffect(() => {
        if (Object.keys(customerData).length === 0 && id !== undefined) {
            loadData();
        }
    }, []);

    const { handleSubmit, control, getValues, reset } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        keepDirty: true,
        defaultValues: useMemo(() => {
            return {
                name: customerData.name,
                address: customerData.address,
                image: null,
                img: customerData.image,
                contacts: customerData.contacts ? customerData.contacts.contacts : []
            };
        }, [customerData])
    });

    async function onSubmitHandler(data) {
        await updateCustomer(id, data).then((res) => {
            if (res.flag) {
                enqueueSnackbar("Customer update success", {
                    variant: 'success',
                });
                setCustomer(res.data);
                history.push({
                    pathname: customerPage.CUSTOMER_VIEW,
                    search: "?" + (name.replace(" ", "-").toLowerCase()),
                    state: {
                        id,
                        name
                    }
                });
            } else {
                enqueueSnackbar("Customer update failed", {
                    variant: 'error',
                });
            }
        });
    };
    return (
        <CustomerForm
            onSubmitHandler={onSubmitHandler}
            handleSubmit={handleSubmit}
            control={control}
            isNewCustomer={false}
            getValues={getValues}
        />
    );
}

export default CustomerUpdate;
