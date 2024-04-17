import { useState, useEffect } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';
import { Controller, useFieldArray } from "react-hook-form";

// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import Icon from "@mui/material/Icon";
import { Box } from "@mui/material";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from "prop-types";
import contactIcon from "assets/images/user.png";

const ContactForm = ({ control, handleSubmit, onSubmitHandler, isNewContact, errors, getValues }) => {
    const [selectedImage, setSelectedImage] = useState("");
    let cnt = 0, errorList = [];
    for (const key in errors) {
        errorList[cnt] = (
            <SuiTypography key={key} textColor="error" variant="caption" component="li">{errors[key].message}</SuiTypography>
        );
        cnt++;
    }
    const imageChange = (e, field) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };
    const removeSelectedImage = () => {
        setSelectedImage();
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: "contact"
    });

    useEffect(() => {
        append({ type: "Mobile", number: '' });
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Box py={1}>
                <Card>
                    <Box pt={2} pb={3} px={3}>
                        <Grid container spacing={2} direction="row">
                            <Grid item xs={12} lg={3}>
                                <Grid container
                                    spacing={1}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item xs={12} >
                                        <SuiBox
                                            style={{ border: "1px solid #eee", height: "150px", display: "flex" }}
                                            borderRadius="lg"
                                            boxShadow="sm"
                                            p={1}
                                            m={4}
                                            mt={2}
                                            mb={1}
                                        >
                                            <img
                                                src={selectedImage ? URL.createObjectURL(selectedImage) : (getValues("img") ? getValues("img") : contactIcon)}
                                                style={{ margin: "auto", width: "100%", height: "auto", maxHeight: "100%" }}
                                            />
                                        </SuiBox>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Controller
                                            name="image"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <SuiButton
                                                        variant="contained"
                                                        component="label"
                                                    >
                                                        Select File
                                                        <input
                                                            type="file"
                                                            hidden
                                                            onChange={(e) => {
                                                                imageChange(e);
                                                                field.onChange(e.target.files);
                                                            }}
                                                            accept="image/*"
                                                        />
                                                    </SuiButton>
                                                    <br />
                                                    <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                </>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <SuiTypography variant="subtitle2" component="div">Name</SuiTypography>
                                        <Controller
                                            name="name"
                                            control={control}
                                            defaultValue=""
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <SuiInput {...field} error={fieldState.invalid} />
                                                        <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                    </>
                                                )
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SuiTypography variant="subtitle2" component="div">Address</SuiTypography>
                                        <Controller
                                            name="address"
                                            control={control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <SuiInput {...field} error={fieldState.invalid} />
                                                        <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                    </>
                                                )
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Box >
            <Grid container spacing={2} direction="row">
                <Grid item xs={12}>
                    {fields.map((cont, index) => (
                        <Box py={1}>
                            <Card>
                                <Box pt={2} pb={3} px={3}>
                                    <Grid
                                        key={cont.id}
                                        container
                                        spacing={4}
                                        direction="row"
                                        alignItems="flex-end"
                                    >
                                        <Grid item xs={12} lg={3}>
                                            <SuiTypography variant="subtitle2" component="div">Type</SuiTypography>
                                            <Controller
                                                name={`contact.${index}.type`}
                                                control={control}
                                                render={({ field, fieldState }) => {
                                                    return (
                                                        <>
                                                            <Select
                                                                {...field}
                                                                error={fieldState.invalid}
                                                            >
                                                                <MenuItem value={"Mobile"}>Mobile</MenuItem>
                                                                <MenuItem value={"Home"}>Home</MenuItem>
                                                                <MenuItem value={"Work"}>Work</MenuItem>
                                                            </Select>
                                                            <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                        </>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={7}>
                                            <SuiTypography variant="subtitle2" component="div">Phone</SuiTypography>
                                            <Controller
                                                name={`contact.${index}.phone`}
                                                control={control}
                                                render={({ field, fieldState }) => {
                                                    return (
                                                        <>
                                                            <SuiInput {...field} error={fieldState.invalid} />
                                                            <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                        </>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={2}>
                                            <SuiTypography textColor="error" variant="caption" component="span"></SuiTypography>
                                            <SuiButton buttonColor="error" onClick={() => remove(index)}>
                                                <Icon className="material-icons-round">delete</Icon>
                                            </SuiButton>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Card>
                        </Box>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <SuiButton variant="outlined" buttonColor="info" style={{ width: "100%" }} onClick={() => append({ type: "Mobile", number: '' })}>
                        <Icon className="material-icons-round">add</Icon> Add Contact
                    </SuiButton>
                </Grid>
                <Grid item xs={12}>
                    <SuiButton style={{ float: "right" }} type="submit" buttonColor={isNewContact ? "primary" : "secondary"}>
                        {isNewContact ? "Save" : "Update"}
                    </SuiButton>
                </Grid>
            </Grid>
        </form >
    );
}

ContactForm.defaultProps = {
    isNewContact: true,
};

ContactForm.propTypes = {
    isNewContact: PropTypes.bool,
    control: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmitHandler: PropTypes.func.isRequired,
};

export default ContactForm;