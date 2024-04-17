// Soft UI Dashboard React example components
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { customerPage } from "links/pages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomerForm from "./_form";
import { useSelector } from "react-redux";
// Custom styles for the Tables

// Service
import { updateCustomer, getCustomerDetail } from "../service"

const schema = yup.object({
    name: yup.string().required("Name cannot be blank").max(100),
    address: yup.string().required("Address cannot be blank").max(100),
    remark: yup.string(),
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
                    const vdData = res.data;
                    reset({
                        name: vdData.name,
                        address: vdData.address,
                        remark: vdData.remark
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
        return () => setCustomer({});
    }, []);

    const { handleSubmit, control, getValues, reset } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        keepDirty: true,
        defaultValues: useMemo(() => {
            return {
                name: customerData.name,
                address: customerData.address,
                remark: customerData.remark
            };
        }, [customerData])
    });

    async function onSubmitHandler(data) {
        await updateCustomer(id, data).then((res) => {
            if (res.flag) {
                enqueueSnackbar("Customer update success", {
                    variant: 'success',
                });
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
