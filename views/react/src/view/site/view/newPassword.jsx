import React, { useState } from 'react';

import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import { pages } from "links/pages";
import { useLocation, useHistory } from "react-router-dom";
import { getNewPassword } from '../service';

import CoverLayout from "../components/CoverLayout";
// Images
import curved9 from "assets/images/curved-images/waterdrop.jpg";

import styles from "./styles";


const schema = yup.object({
    new_password: yup.string().required("Password cannot be blank").min(6),
    confirm_password: yup.string().required("Confirm password cannot be blank").min(6),
});

const NewPassword = () => {
    const history = useHistory();
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { enqueueSnackbar } = useSnackbar();
    if (!history.location.state) {
        history.push(pages.FORGOT_PASSWORD);
        return <></>;
    }
    const { id, email, verifyCode } = history.location.state;

    const onSubmitHandler = async (fdata) => {
        await getNewPassword({
            ...fdata,
            id,
            verifyCode
        }).then(({ flag, message, data }) => {
            if (flag) {
                enqueueSnackbar(message, {
                    variant: 'success',
                });
                history.push({
                    pathname: pages.LOGIN
                });
            } else {
                enqueueSnackbar(message, {
                    variant: 'warning',
                });
            }
        });
    }

    return (
        <CoverLayout
            title={"Change Password"}
            description={"Enter new password and confirm it for " + email}
            image={curved9}
        >
            <SuiBox component="form" role="form" onSubmit={handleSubmit(onSubmitHandler)}>
                <SuiBox mb={2}>
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography component="label" variant="caption" fontWeight="bold">
                            New Password
                        </SuiTypography>
                    </SuiBox>
                    <Controller
                        name="new_password"
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
                <SuiBox mb={2}>
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography component="label" variant="caption" fontWeight="bold">
                            Confirm New Password
                        </SuiTypography>
                    </SuiBox>
                    <Controller
                        name="confirm_password"
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
                <SuiBox mt={4} mb={1}>
                    <SuiButton type="submit" variant="gradient" buttonColor="info" fullWidth>
                        Change
                    </SuiButton>
                </SuiBox>
            </SuiBox>
        </CoverLayout>
    );

}

export default NewPassword;