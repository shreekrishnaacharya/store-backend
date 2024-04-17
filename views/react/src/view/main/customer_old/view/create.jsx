// Soft UI Dashboard React example components
import { useForm } from "react-hook-form";
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
    name: yup.string().required("Name cannot be blank").max(100),
    address: yup.string().required("Address cannot be blank").max(100),
    remark: yup.string(),
});

function CustomerAdd() {
    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    async function onSubmitHandler(fdata) {
        await addCustomer(fdata).then(({ flag, data }) => {
            if (flag) {
                enqueueSnackbar("Customer add success", {
                    variant: 'success',
                });
                history.push({
                    pathname: customerPage.CUSTOMER_VIEW,
                    search: "?" + (data.name.replace(" ", "-").toLowerCase()),
                    state: {
                        id: data.id,
                        name: data.name
                    }
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
