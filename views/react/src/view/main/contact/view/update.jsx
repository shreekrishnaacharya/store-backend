
// Soft UI Dashboard React example components
import { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { contactPage } from "links/pages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setContactDetail } from "redux/action/contactAction";
import ContactForm from "./_form";
// Custom styles for the Tables

// Service
import { updateContact, getContactDetail } from "../service"

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

function ContactUpdate() {
    const { enqueueSnackbar } = useSnackbar();
    const contactData = useSelector(state => state.contactDetail);
    const { id, name } = useSelector(state => state.navPath["curr"]);
    const history = useHistory();
    const dispatch = useDispatch();
    async function loadData() {
        await getContactDetail(id)
            .then((res) => {
                if (res.flag) {
                    const itData = res.data;
                    reset({
                        name: itData.name,
                        address: itData.address,
                        image: null,
                        img: itData.image,
                        contact: [...itData.contacts]
                    }, {
                        keepDirty: true
                    });
                }
            });
    }
    useEffect(() => {
        if (Object.keys(contactData).length === 0 && id !== undefined) {
            loadData();
        }
    }, []);

    const { handleSubmit, control, getValues, reset } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        keepDirty: true,
        defaultValues: useMemo(() => {
            return {
                name: contactData.name,
                address: contactData.address,
                image: null,
                img: contactData.image,
                contact: contactData.contacts
            };
        }, [contactData])
    });

    async function onSubmitHandler(data) {
        await updateContact(id, data).then((res) => {
            if (res.flag) {
                enqueueSnackbar("Contact update success", {
                    variant: 'success',
                });
                dispatch(setContactDetail(res.data));
                history.push({
                    pathname: contactPage.CONTACT_VIEW,
                    search: "?" + (name.replace(" ", "-").toLowerCase()),
                    state: {
                        id,
                        name
                    }
                });
            } else {
                enqueueSnackbar("Contact update failed", {
                    variant: 'error',
                });
            }
        });
    };
    return (
        <ContactForm
            onSubmitHandler={onSubmitHandler}
            handleSubmit={handleSubmit}
            control={control}
            isNewContact={false}
            getValues={getValues}
        />
    );
}

export default ContactUpdate;
