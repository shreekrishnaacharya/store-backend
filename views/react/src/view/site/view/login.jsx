import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Link, useHistory } from 'react-router-dom';
import Switch from "@mui/material/Switch";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

import { useDispatch } from "react-redux";
import { setLogin } from "redux/action/userAction";

import { pages } from "links/pages";


import { getLogin } from '../service';

import CoverLayout from "../components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

const schema = yup.object({
    email: yup.string().required("Email cannot be blank").email(),
    password: yup.string().required("Password cannot be blank"),
});

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [rememberMe, setRememberMe] = useState(true);
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleSetRememberMe = () => setRememberMe(!rememberMe);

    const onSubmitHandler = async (fdata) => {
        await getLogin(fdata).then((res) => {
            if (res.flag == true) {
                enqueueSnackbar("Login success", {
                    variant: 'success',
                });
                dispatch(setLogin({
                    ...res.data.data
                }));
                history.push({
                    pathname: pages.DASHBOARD
                });
            } else {
                enqueueSnackbar("Invalid login detail", {
                    variant: 'error',
                });
            }
        });
    }

    return (
        <CoverLayout
            title="Welcome back"
            description="Enter your email and password to sign in"
            image={curved9}
        >
            <SuiBox component="form" role="form" onSubmit={handleSubmit(onSubmitHandler)}>
                <SuiBox mb={2}>
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography component="label" variant="caption" fontWeight="bold">
                            Email
                        </SuiTypography>
                    </SuiBox>
                    <Controller
                        name="email"
                        defaultValue=""
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
                </SuiBox>
                <SuiBox mb={2}>
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography component="label" variant="caption" fontWeight="bold">
                            Password
                        </SuiTypography>
                    </SuiBox>
                    <Controller
                        name="password"
                        defaultValue=""
                        control={control}
                        render={({ field, fieldState }) => {
                            return (
                                <>
                                    <SuiInput type="password" {...field} error={fieldState.invalid} />
                                    <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                </>
                            )
                        }}
                    />
                </SuiBox>
                <SuiBox display="flex" alignItems="center">
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <SuiTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={handleSetRememberMe}
                        customClass="cursor-pointer user-select-none"
                    >
                        &nbsp;&nbsp;Remember me
                    </SuiTypography>
                </SuiBox>
                <SuiBox mt={4} mb={1}>
                    <SuiButton type="submit" variant="gradient" buttonColor="info" fullWidth>
                        sign in
                    </SuiButton>
                </SuiBox>
                <SuiBox mt={3}>
                    <SuiTypography variant="button" textColor="text" fontWeight="regular">
                        Forgot Password?&nbsp;
                        <SuiTypography
                            component={Link}
                            to={pages.FORGOT_PASSWORD}
                            variant="button"
                            textColor="info"
                            fontWeight="medium"
                            textGradient
                        >
                            Click Here
                        </SuiTypography>
                    </SuiTypography>
                </SuiBox>
                <SuiBox mt={3} >
                    <SuiTypography variant="button" textColor="text" fontWeight="regular">
                        Demo Login :<br />
                    </SuiTypography>
                    <SuiTypography variant="button" textColor="text" fontWeight="regular">
                        Email : demo@admin.com<br />
                        Password : demo12345
                    </SuiTypography>
                </SuiBox>
            </SuiBox>
        </CoverLayout>
    );
}

export default Login;
