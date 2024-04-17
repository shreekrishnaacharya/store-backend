import { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object({
    amount: yup.number().required().label('Amount'),
});

const AddPayment = ({ isOpen, handleClose, saleModel, callBack }) => {
    const { control, handleSubmit, reset, setError } = useForm({
        resolver: yupResolver(schema)
    });
    async function onSubmitHandler(fdata) {
        callBack(fdata.amount);
    };
    useEffect(() => {
        reset({ amount: (saleModel.total_amt - saleModel.pay_amt) });
    }, [isOpen]);
    return (
        <>
            <Dialog
                keepMounted
                maxWidth="md"
                open={isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title2">
                    Add Payment : {saleModel.ref_no}
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                    >
                        <Grid item xs={12}>
                            <SuiTypography variant="subtitle2" component="div">Payment Amount</SuiTypography>
                            <Controller
                                defaultValue=""
                                name={`amount`}
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
                </DialogContent>
                <DialogActions>
                    <SuiButton onClick={handleClose} buttonColor={"light"}>
                        Close
                    </SuiButton>
                    <SuiButton onClick={handleSubmit(onSubmitHandler)} buttonColor={"secondary"}>
                        Save
                    </SuiButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddPayment;