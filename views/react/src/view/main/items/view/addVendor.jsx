import { useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import Grid from "@mui/material/Grid";
import { useSnackbar } from 'notistack';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Icon from "@mui/material/Icon";
import SelectInput from "components/SelectInput";
import { getVendorList, updateItem } from "../service";

const schema = yup.object({
    vendor: yup.array()
        .of(yup.object().shape({
            id: yup.mixed().required().label('Vendor'),
            price: yup.number().required().label("Cast Price")
        })),
});

const AddVendor = ({ isOpen, handleClose, id, callBack }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { control, handleSubmit, setValue, reset } = useForm({
        resolver: yupResolver(schema)
    });
    async function onSubmitHandler(fdata) {
        await updateItem(id, fdata).then(({ flag, data }) => {
            if (flag) {
                enqueueSnackbar("Vendor add success", {
                    variant: 'success',
                });
                callBack();
                handleClose();
            }
        });
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
        reset({ vendor: [] });
        append({ id: '', price: '' });
    }, [isOpen]);

    return (
        <>
            <Dialog
                keepMounted
                open={isOpen}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Add Vendor
                </DialogTitle>
                <DialogContent>
                    <form>
                        <Grid item xs={12}>
                            {fields.map((cont, index) => (
                                <Grid
                                    key={cont.id}
                                    container
                                    spacing={2}
                                    direction="row"
                                    alignItems="flex-end"
                                >
                                    <Grid item xs={12} lg={6}>
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
                                    <Grid item xs={12} lg={3}>
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
                                    <Grid item xs={12} lg={3}>
                                        <SuiTypography textColor="error" variant="caption" component="span"></SuiTypography>
                                        <SuiButton style={{ marginLeft: "5px", float: "right" }} iconOnly={true} buttonColor="error" onClick={() => remove(index)}>
                                            <Icon className="material-icons-round">delete</Icon>
                                        </SuiButton>
                                        <SuiButton style={{ float: "right" }} iconOnly={true} buttonColor="success" onClick={() => append({ id: '', price: '' })}>
                                            <Icon className="material-icons-round">add</Icon>
                                        </SuiButton>

                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </form>
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

export default AddVendor;