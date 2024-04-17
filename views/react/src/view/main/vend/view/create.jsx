
// Soft UI Dashboard React example components
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import VendForm from "./_form";
import { useHistory } from "react-router-dom";
import { vendPage } from "links/pages";
// Custom styles for the Tables

// Service
import { addVend } from "../service"


const schema = yup.object({
    name: yup.string().required("Name cannot be blank").max(100),
    address: yup.string().required("Address cannot be blank").max(100),
    contact_person: yup.string().required("Contact Person cannot be blank").max(100),
});

function VendAdd() {
    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    async function onSubmitHandler(fdata) {
        await addVend(fdata).then(({ flag, data }) => {
            if (flag) {
                enqueueSnackbar("Vend add success", {
                    variant: 'success',
                });
                history.push({
                    pathname: vendPage.VEND_VIEW,
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
        <VendForm
            onSubmitHandler={onSubmitHandler}
            handleSubmit={handleSubmit}
            control={control}
            errors={errors}
            getValues={getValues}
        />
    );
}

export default VendAdd;
