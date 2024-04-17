/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "../components/BasicLayout";
import { sitePage } from "links/pages";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { getSignup } from "../service";

const schema = yup.object({
    email: yup.string().required("Email cannot be blank").email(),
    passwd: yup.string().required("Password cannot be blank").min(6),
    name: yup.string().required("Name cannot be blank"),
    gender: yup.string().required("Gender is required"),
    agree: yup.bool()
        .oneOf([true], 'You must agree to the terms and conditions'),
});

function SignUp() {
    const [agreement, setAgremment] = useState(true);
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    const handleSetAgremment = () => {
        setValue("agree", !agreement);
        setAgremment(!agreement);
    };

    const { enqueueSnackbar } = useSnackbar();

    const onSubmitHandler = async (fdata) => {
        await getSignup(fdata).then((res) => {
            if (res.flag == true) {
                enqueueSnackbar("Signup success", {
                    variant: 'success',
                });
                history.push({
                    pathname: sitePage.LOGIN
                });
            } else {
                enqueueSnackbar("Signup failed", {
                    variant: 'error',
                });
            }
        });
    }

    return (
        <BasicLayout
            title="Welcome!"
            description="Use these awesome forms to login or create new account in your project for free."
            image={curved6}
        >
            <Card>
                <SuiBox p={3} mb={1} textAlign="center">
                    <SuiTypography variant="h5" fontWeight="medium">
                        Sign Up
                    </SuiTypography>
                </SuiBox>
                <SuiBox pt={2} pb={3} px={3}>
                    <SuiBox component="form" role="form" onSubmit={handleSubmit(onSubmitHandler)}>
                        <SuiBox mb={2}>
                            <Controller
                                name="name"
                                defaultValue=""
                                control={control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <SuiInput placeholder="Name" {...field} error={fieldState.invalid} />
                                            <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                        </>
                                    )
                                }}
                            />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <Controller
                                name="email"
                                defaultValue=""
                                control={control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <SuiInput placeholder="Email" {...field} error={fieldState.invalid} />
                                            <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                        </>
                                    )
                                }}
                            />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <Controller
                                name="passwd"
                                defaultValue=""
                                control={control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <SuiInput type="password" placeholder="Password" {...field} error={fieldState.invalid} />
                                            <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                        </>
                                    )
                                }}
                            />
                        </SuiBox>
                        <SuiBox mb={2}>
                            <FormControl
                                margin={"dense"}
                                size="small"
                            >
                                <SuiTypography
                                    variant="button"
                                    fontWeight="regular">Gender</SuiTypography>
                                <Controller
                                    name="gender"
                                    defaultValue=""
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <>
                                                <RadioGroup
                                                    {...field}
                                                    row
                                                    aria-labelledby="user-gender"
                                                >
                                                    <FormControlLabel labelPlacement={"start"} value="Female" control={<Radio size="small" />} label="Female" />
                                                    <FormControlLabel labelPlacement={"start"} value="Male" control={<Radio size="small" />} label="Male" />
                                                </RadioGroup>
                                                <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                            </>
                                        )
                                    }}
                                />
                            </FormControl>
                        </SuiBox>
                        <SuiBox alignItems="center">
                            <Controller
                                name="agree"
                                defaultValue={agreement}
                                control={control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <Checkbox onClick={handleSetAgremment} {...field} checked={agreement} />
                                            <SuiTypography
                                                component="label"
                                                variant="button"
                                                fontWeight="regular"
                                                onClick={handleSetAgremment}
                                                customClass="cursor-pointer user-select-none"
                                            >
                                                &nbsp;&nbsp;I agree the&nbsp;
                                            </SuiTypography>
                                            <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                                                Terms and Conditions
                                            </SuiTypography>
                                            <SuiTypography textColor="error" variant="caption" component="div">{fieldState.error?.message}</SuiTypography>
                                        </>
                                    )
                                }}
                            />
                        </SuiBox>
                        <SuiBox mt={4} mb={1}>
                            <SuiButton type="submit" variant="gradient" buttonColor="dark" fullWidth>
                                sign up
                            </SuiButton>
                        </SuiBox>
                        <SuiBox mt={3} textAlign="center">
                            <SuiTypography variant="button" textColor="text" fontWeight="regular">
                                Already have an account?&nbsp;
                                <SuiTypography
                                    component={Link}
                                    to={sitePage.LOGIN}
                                    variant="button"
                                    textColor="dark"
                                    fontWeight="bold"
                                    textGradient
                                >
                                    Sign in
                                </SuiTypography>
                            </SuiTypography>
                        </SuiBox>
                    </SuiBox>
                </SuiBox>
            </Card>
        </BasicLayout>
    );
}

export default SignUp;
