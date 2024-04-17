
// Soft UI Dashboard React example components
import { useForm, useFieldArray } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomerForm from "./_form";
import { useHistory } from "react-router-dom";
import { customerPage } from "links/pages";
// Custom styles for the Tables

// Service
import { addCustomer } from "../service"

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

function CustomerAdd() {
    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    async function onSubmitHandler(fdata) {
        await addCustomer(fdata).then(({ flag, data }) => {
            if (flag) {
                enqueueSnackbar("Customer add success", {
                    variant: 'success',
                });
                // history.push({
                //     pathname: customerPage.CUSTOMER_VIEW,
                //     search: "?" + (data.name.replace(" ", "-").toLowerCase()),
                //     state: {
                //         id: data.id,
                //         name: data.name
                //     }
                // });
            } else {
                enqueueSnackbar("Customer add failed", {
                    variant: 'error',
                });
            }
        })
    };
    return (
        <CustomerForm
            onSubmitHandler={onSubmitHandler}
            handleSubmit={handleSubmit}
            control={control}
            errors={errors}
            getValues={getValues}
        />
    );
}

export default CustomerAdd;
