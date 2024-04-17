import { useState, useEffect } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';
import { Controller, useFieldArray } from "react-hook-form";
// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import { Box } from "@mui/material";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import PropTypes from "prop-types";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Icon from "@mui/material/Icon";
import SelectInput from "components/SelectInput";
import productIcon from "assets/images/product.png";
import { getVendorList } from "../service";

const ItemForm = ({ control, handleSubmit, onSubmitHandler, isNewItem, errors, getValues, setValue }) => {
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
        name: "vendor"
    });
    const handleOptions = async (value) => {
        return await getVendorList(value)
            .then((res) => {
                if (res.flag) {
                    return res.data;
                }
                return [];
            });
    }

    useEffect(() => {
        append({ id: '', price: '' });
    }, []);
    return (
        <Box py={3}>
            <Box mb={3}>
                <Card>
                    <Box pt={2} pb={3} px={3}>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <Grid container spacing={2} direction="row">
                                <Grid item xs={12} lg={4}>
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
                                                    src={selectedImage ? URL.createObjectURL(selectedImage) : (getValues("img_view") ? getValues("img_view") : productIcon)}
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
                                            <SuiTypography variant="subtitle2" component="div">Code</SuiTypography>
                                            <Controller
                                                name="code"
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
                                        <Grid item xs={12} lg={6}>
                                            <SuiTypography variant="subtitle2" component="div">Min Qty</SuiTypography>
                                            <Controller
                                                name="min_qty"
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
                                        <Grid item xs={12} lg={6}>
                                            <SuiTypography variant="subtitle2" component="div">Life</SuiTypography>
                                            <Controller
                                                name="expire_time"
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

                                <Grid item xs={12} lg={12}>
                                    <Grid container spacing={2} justifyContent="flex-end">
                                        <Grid item xs={12} lg={4}>
                                            <SuiTypography variant="subtitle2" component="div">Selling Price</SuiTypography>
                                            <Controller
                                                name="sprice"
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
                                        <Grid item xs={12} lg={4}>
                                            <SuiTypography variant="subtitle2" component="div">Unit Type</SuiTypography>
                                            <Controller
                                                name="qty_typ"
                                                control={control}
                                                render={({ field, fieldState }) => {
                                                    return (
                                                        <>
                                                            <Select
                                                                {...field}
                                                                error={fieldState.invalid}
                                                            >
                                                                <MenuItem value={"1"}>Meter</MenuItem>
                                                                <MenuItem value={"2"}>Pieces</MenuItem>
                                                                <MenuItem value={"3"}>Kg</MenuItem>
                                                            </Select>
                                                            <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                        </>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                        {isNewItem && (
                                            <Grid item xs={12}>
                                                {fields.map((cont, index) => (
                                                    <Grid
                                                        key={cont.id}
                                                        container
                                                        spacing={2}
                                                        direction="row"
                                                        alignItems="flex-end"
                                                    >
                                                        <Grid item xs={8}>
                                                            <SuiTypography variant="subtitle2" component="div">Vendor</SuiTypography>
                                                            <Controller
                                                                name={`vendor.${index}.id`}
                                                                control={control}
                                                                render={({ field, fieldState }) => {
                                                                    return (
                                                                        <>
                                                                            <SelectInput
                                                                                {...field}
                                                                                onChange={(e, v) => {
                                                                                    setValue(`vendor.${index}.id`, v.id);
                                                                                }}
                                                                                handleOptions={handleOptions}
                                                                                error={fieldState.invalid}
                                                                            />
                                                                            <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                                        </>
                                                                    )
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <SuiTypography variant="subtitle2" component="div">Cost Price</SuiTypography>
                                                            <Controller
                                                                name={`vendor.${index}.price`}
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
                                                        <Grid item xs={2} alignItems={"center"}>
                                                            <SuiTypography textColor="error" variant="caption" component="span"></SuiTypography>
                                                            <SuiButton iconOnly={true} buttonColor="success" onClick={() => append({ id: '', price: '' })}>
                                                                <Icon className="material-icons-round">add</Icon>
                                                            </SuiButton>
                                                            <SuiButton style={{ marginLeft: "5px" }} iconOnly={true} buttonColor="error" onClick={() => remove(index)}>
                                                                <Icon className="material-icons-round">delete</Icon>
                                                            </SuiButton>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        )}

                                    </Grid>
                                </Grid>
                                <Grid item xs={9}>
                                    {errorList}
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiButton style={{ float: "right" }} type="submit" buttonColor={isNewItem ? "primary" : "secondary"}>
                                        {isNewItem ? "Save" : "Update"}
                                    </SuiButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Card>
            </Box>
        </Box >
    );
}

ItemForm.defaultProps = {
    isNewItem: true,
};

ItemForm.propTypes = {
    isNewItem: PropTypes.bool,
    control: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmitHandler: PropTypes.func.isRequired,
};

export default ItemForm;