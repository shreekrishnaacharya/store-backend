import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import { Link, useHistory } from 'react-router-dom';
import { pages } from "links/pages";

import { getUserByEmail } from '../service';
import CoverLayout from "../components/CoverLayout";
// Images
import curved9 from "assets/images/curved-images/colormix.jpg";

const schema = yup.object({
    email: yup.string().required("Email cannot be blank").email(),
});

const ForgotPassword = () => {

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();


    const onSubmitHandler = async (fdata) => {
        await getUserByEmail(fdata).then(({ flag, data }) => {
            if (flag == true) {
                enqueueSnackbar("Email send success", {
                    variant: 'success',
                });
                history.push({
                    pathname: pages.VERIFY_TOKEN,
                    state: {
                        id: data.id,
                        email: data.email
                    }
                });
            } else {
                enqueueSnackbar(data.message, {
                    variant: 'error',
                });
            }
        });
    }

    return (
        <CoverLayout
            title="Forgot password?"
            description="Enter your email to reset you password"
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
                        control={control}
                        render={({ field, fieldState }) => {
                            return (
                                <>
                                    <SuiInput type="email" {...field} error={fieldState.invalid} />
                                    <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                </>
                            )
                        }}
                    />
                </SuiBox>
                <SuiBox mt={4} mb={1}>
                    <SuiButton type="submit" variant="gradient" buttonColor="info" fullWidth>
                        Submit
                    </SuiButton>
                </SuiBox>
                <SuiBox mt={3}>
                    <SuiTypography variant="button" textColor="text" fontWeight="regular">
                        Remembered password?&nbsp;
                        <SuiTypography
                            component={Link}
                            to={pages.LOGIN}
                            variant="button"
                            textColor="info"
                            fontWeight="medium"
                        // textGradient
                        >
                            Login Here
                        </SuiTypography>
                    </SuiTypography>
                </SuiBox>
            </SuiBox>
        </CoverLayout>
    );

}

export default ForgotPassword;