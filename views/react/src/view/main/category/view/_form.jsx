import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';
import { Controller } from "react-hook-form";

// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import { Box } from "@mui/material";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import PropTypes from "prop-types";

const CategoryForm = ({ control, handleSubmit, onSubmitHandler, isNewCategory, errors, getValues }) => {
    let cnt = 0, errorList = [];
    for (const key in errors) {
        errorList[cnt] = (
            <SuiTypography key={key} textColor="error" variant="caption" component="li">{errors[key].message}</SuiTypography>
        );
        cnt++;
    }
    return (
        <Box py={3}>
            <Box mb={3}>
                <Card>
                    <Box pt={2} pb={3} px={3}>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                                <Grid item xs={9}>
                                    {errorList}
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiButton style={{ float: "right" }} type="submit" buttonColor={isNewCategory ? "primary" : "secondary"}>
                                        {isNewCategory ? "Save" : "Update"}
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

CategoryForm.defaultProps = {
    isNewCategory: true,
};

CategoryForm.propTypes = {
    isNewCategory: PropTypes.bool,
    control: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmitHandler: PropTypes.func.isRequired,
};

export default CategoryForm;