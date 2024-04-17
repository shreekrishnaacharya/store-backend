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
import styles from "./styles";

import { getVerifyToken } from '../service';
import CoverLayout from "../components/CoverLayout";
// Images
import curved9 from "assets/images/curved-images/greentree.jpg";

const schema = yup.object({
    verifyCode: yup.string().required("Token cannot be blank"),
});

const VerifyToken = () => {

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    if (!history.location.state) {
        history.push(pages.FORGOT_PASSWORD);
        return <></>;
    }
    const { id, email } = history.location.state;

    const onSubmitHandler = async (fdata) => {
        await getVerifyToken({ ...fdata, id }).then(({ flag, message, data }) => {
            if (flag==true) {
                enqueueSnackbar("Token verified", {
                    variant: 'success',
                });
                history.push({
                    pathname: pages.NEW_PASSWORD,
                    state: {
                        ...fdata,
                        id,
                        email,
                    }
                });
            } else {
                enqueueSnackbar(message, {
                    variant: 'error',
                });
            }
        });
    }

    return (
        <CoverLayout
            title="Verify your token?"
            description="Enter the token to change your password"
            image={curved9}
        >
            <SuiBox component="form" role="form" onSubmit={handleSubmit(onSubmitHandler)}>
                <SuiBox mb={2}>
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography component="label" variant="caption" fontWeight="bold">
                            Token
                        </SuiTypography>
                    </SuiBox>
                    <Controller
                        name="verifyCode"
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
                <SuiBox mt={4} mb={1}>
                    <SuiButton type="submit" variant="gradient" buttonColor="info" fullWidth>
                        Submit
                    </SuiButton>
                </SuiBox>
                <SuiBox mt={3} textAlign="center">
                    <SuiTypography variant="button" textColor="text" fontWeight="regular">
                        Remembered password?&nbsp;
                        <SuiTypography
                            component={Link}
                            to={pages.LOGIN}
                            variant="button"
                            textColor="info"
                            fontWeight="medium"
                            textGradient
                        >
                            Login Here
                        </SuiTypography>
                    </SuiTypography>
                </SuiBox>
            </SuiBox>
        </CoverLayout>
    );

}

export default VerifyToken;