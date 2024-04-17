
// Soft UI Dashboard React example components
import { useForm, useFieldArray } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ContactForm from "./_form";
import { useHistory } from "react-router-dom";
import { contactPage } from "links/pages";
// Custom styles for the Tables

// Service
import { addContact } from "../service"

const schema = yup.object({
    image: yup.mixed().test("fileSize", "Max file size is 1MB", (value, ob1) => {
        return !value || value[0].size < 1200000;
    }).test("type", "Only jpg,jpeg and png are supported", (value) => {
        return !value || (value[0].type === "image/jpeg" || value[0].type === "image/jpg" || value[0].type === "image/png");
    }),
    name: yup.string().required("Name cannot be blank").max(100),
    address: yup.string().max(100),
    contact: yup.array()
        .min(1, "Create at least contact")
        .of(yup.object().shape({
            type: yup.string("Type must be string").required("Type is required"),
            phone: yup.number("Phone must be number").required("Phone is required")
        })),
});

function ContactAdd() {
    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    async function onSubmitHandler(fdata) {
        await addContact(fdata).then(({ flag, data }) => {
            if (flag) {
                enqueueSnackbar("Contact add success", {
                    variant: 'success',
                });
                history.push({
                    pathname: contactPage.CONTACT_VIEW,
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
        <ContactForm
            onSubmitHandler={onSubmitHandler}
            handleSubmit={handleSubmit}
            control={control}
            errors={errors}
            getValues={getValues}
        />
    );
}

export default ContactAdd;
