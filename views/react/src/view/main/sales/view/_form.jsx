import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Controller, useFieldArray } from "react-hook-form";
// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import { Box } from "@mui/material";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import PropTypes from "prop-types";
// import MenuSales from '@mui/material/MenuSales';
import Icon from "@mui/material/Icon";
import SelectInput from "components/SelectInput";
import FileInput from "components/FileInput";
import { getCustomerList, getItemList, getStoreList, getSalesStatus } from "../service";

const SalesForm = ({ control, handleSubmit, onSubmitHandler, isNewSales, errors, getValues, setValue }) => {
    const [itemSelected, setItemSelected] = useState(null);
    const [itemTable, setItemTable] = useState({ itemList: [], totAmt: 0, gtAmt: 0, totQty: 0 });
    let cnt = 0, errorList = [];
    for (const key in errors) {
        errorList[cnt] = (
            <SuiTypography key={key} textColor="error" variant="caption" component="li">{errors[key].message}</SuiTypography>
        );
        cnt++;
    }

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });
    const handleStore = async (value) => {
        return await getStoreList(value)
            .then((res) => {
                if (res.flag) {
                    return res.data;
                }
                return [];
            });
    }

    const handleItem = async (value) => {
        return await getItemList(value)
            .then((res) => {
                if (res.flag) {
                    return res.data;
                }
                return [];
            });
    }


    const handleCustomer = async (value) => {
        return await getCustomerList(value)
            .then((res) => {
                if (res.flag) {
                    return res.data;
                }
                return [];
            });
    }

    const handleStatus = async (value) => {
        return await getSalesStatus(value)
            .then((res) => {
                if (res.flag) {
                    return res.data;
                }
                return [];
            });
    }

    const onItemAdd = () => {
        append({ itemid: itemSelected.id, name: itemSelected.name, cost: itemSelected.sprice, qty: 1, mqty: itemSelected.avi_qty });
        updateCalculate();
        setItemSelected(null);
    }

    function updateCalculate() {
        let totQty = 0, totAmt = 0;
        const itemList = getValues("items");
        let itemTotal = [...itemTable.itemList];
        itemList.forEach((val, i) => {
            totQty += parseFloat(val.qty);
            totAmt += parseFloat(parseFloat(val.cost * val.qty));
            itemTotal[i] = parseFloat(val.cost * val.qty);
        });
        const vatRate = parseFloat(getValues("vat_rate"));
        const disAmt = totAmt - parseFloat(getValues("dis_amt"));
        const gtAmt = disAmt + (disAmt * (vatRate / 100));

        setItemTable({ itemList: itemTotal, gtAmt: gtAmt, totAmt: totAmt, totQty: totQty });
    }

    return (
        <Box py={3}>
            <Box mb={3}>
                <Card>
                    <Box pt={2} pb={3} px={3}>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={3}>
                                    <SuiTypography variant="subtitle2" component="div">Date</SuiTypography>
                                    <Controller
                                        name="ptdate"
                                        control={control}
                                        defaultValue=""
                                        render={({ field, fieldState }) => {
                                            return (
                                                <>
                                                    <SuiInput
                                                        {...field}
                                                        error={fieldState.invalid}
                                                        type="date"
                                                    />
                                                    <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                </>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                    <SuiTypography variant="subtitle2" component="div">Refrence No.</SuiTypography>
                                    <Controller
                                        name="ref_no"
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
                                <Grid item xs={12} lg={3}>
                                    <SuiTypography variant="subtitle2" component="div">Warehouse</SuiTypography>
                                    <Controller
                                        name="fstore"
                                        control={control}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <>
                                                    <SelectInput
                                                        {...field}
                                                        label="nam"
                                                        onChange={(e, v) => {
                                                            if (v) {
                                                                setValue(`fstore`, v.id);
                                                            } else {
                                                                setValue(`fstore`, null);
                                                            }
                                                        }}
                                                        handleOptions={handleStore}
                                                        error={fieldState.invalid}
                                                    />
                                                    <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                </>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                    <SuiTypography variant="subtitle2" component="div">Status</SuiTypography>
                                    <Controller
                                        name="sts"
                                        control={control}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <>
                                                    <SelectInput
                                                        {...field}
                                                        onChange={(e, v) => {
                                                            if (v) {
                                                                setValue(`sts`, v.id);
                                                            } else {
                                                                setValue(`sts`, null);
                                                            }
                                                        }}
                                                        handleOptions={handleStatus}
                                                        error={fieldState.invalid}
                                                    />
                                                    <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                </>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                    <SuiTypography variant="subtitle2" component="div">Customer</SuiTypography>
                                    <Controller
                                        name="fcus"
                                        control={control}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <>
                                                    <SelectInput
                                                        {...field}

                                                        onChange={(e, v) => {
                                                            if (v) {
                                                                setValue(`fcus`, v.id);
                                                            } else {
                                                                setValue(`fcus`, null);
                                                            }
                                                        }}
                                                        handleOptions={handleCustomer}
                                                        error={fieldState.invalid}
                                                    />
                                                    <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                </>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={3}>
                                    <SuiTypography variant="subtitle2" component="div">Shipping</SuiTypography>
                                    <Controller
                                        name="shipping"
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

                                <Grid item xs={12} lg={3}>
                                    <SuiTypography variant="subtitle2" component="div">Payment Terms(In days)</SuiTypography>
                                    <Controller
                                        name="pym_term"
                                        control={control}
                                        defaultValue="0"
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
                                    <SuiTypography variant="subtitle2" component="div">Attachment</SuiTypography>
                                    <Controller
                                        name="attachfile"
                                        control={control}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <>
                                                    <FileInput
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                        }}
                                                    ><SuiTypography textColor="secondary" variant="caption" component="span">Select File</SuiTypography></FileInput>
                                                    <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                </>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={2}
                                        direction="row"
                                    >
                                        <Grid item xs={8} lg={10}>
                                            <SuiTypography variant="subtitle2" component="div">Items</SuiTypography>
                                            <Controller
                                                name="itemselect"
                                                control={control}
                                                render={({ field, fieldState }) => {
                                                    return (
                                                        <>
                                                            <SelectInput
                                                                {...field}
                                                                value={getValues("itemselect")}
                                                                onChange={(e, v) => {
                                                                    if (v) {
                                                                        setItemSelected(v);
                                                                    } else {
                                                                        setItemSelected(null);
                                                                    }
                                                                }}
                                                                handleOptions={handleItem}
                                                                error={fieldState.invalid}
                                                            />
                                                            <SuiTypography textColor="error" variant="caption" component="span">{errors["items"]?.message}</SuiTypography>
                                                        </>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <SuiTypography variant="subtitle2" component="div">&nbsp;</SuiTypography>
                                            <SuiButton buttonColor="success" disabled={itemSelected === null ? true : false} onClick={onItemAdd}>
                                                <Icon className="material-icons-round">add</Icon> Add
                                            </SuiButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table
                                            aria-labelledby="tableTitle"
                                            size={'small'}
                                        >
                                            <TableHead style={{ backgroundColor: "#eee" }}>
                                                <TableRow>
                                                    <TableCell>
                                                        <SuiTypography variant="subtitle2" component="div">Name</SuiTypography>
                                                    </TableCell>
                                                    <TableCell style={{ width: "10%", textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">Net Unit Cost</SuiTypography>
                                                    </TableCell>
                                                    <TableCell style={{ width: "12%", textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">Quantity</SuiTypography>
                                                    </TableCell>
                                                    <TableCell style={{ width: "15%", textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">Total</SuiTypography>
                                                    </TableCell>
                                                    <TableCell style={{ width: "10%" }}>
                                                        <SuiTypography variant="subtitle2" component="div">Action</SuiTypography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {fields.map((cont, index) => (
                                                    <TableRow key={cont.id}>
                                                        <TableCell>
                                                            <SuiTypography variant="body2" component="div">{cont.name}</SuiTypography>
                                                        </TableCell>
                                                        <TableCell style={{ textAlign: "right" }}>
                                                            <Controller
                                                                name={`items.${index}.cost`}
                                                                control={control}
                                                                render={({ field, fieldState }) => {
                                                                    return (
                                                                        <>
                                                                            <SuiInput
                                                                                {...field}
                                                                                size="small"
                                                                                style={{ textAlign: "right" }}
                                                                                onChange={(e) => {
                                                                                    field.onChange(e.target.value);
                                                                                    updateCalculate();
                                                                                }}
                                                                                error={fieldState.invalid}
                                                                            />
                                                                            <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                                        </>
                                                                    )
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell style={{ textAlign: "right" }}>
                                                            <Controller
                                                                name={`items.${index}.qty`}
                                                                control={control}
                                                                render={({ field, fieldState }) => {
                                                                    return (
                                                                        <>
                                                                            <SuiInput
                                                                                {...field}
                                                                                type="number"
                                                                                size="small"
                                                                                style={{ textAlign: "right" }}
                                                                                min={0}
                                                                                error={fieldState.invalid}
                                                                                onChange={(e) => {
                                                                                    field.onChange(e.target.value);
                                                                                    updateCalculate();
                                                                                }}
                                                                            />
                                                                            <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                                        </>
                                                                    )
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell style={{ textAlign: "right" }}>
                                                            <SuiTypography variant="body2" component="div">{itemTable.itemList[index]}</SuiTypography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <SuiTypography textColor="error" variant="caption" component="span"></SuiTypography>
                                                            <SuiButton style={{ marginLeft: "5px" }} iconOnly={true} buttonColor="error" onClick={() => { remove(index); updateCalculate(); }}>
                                                                <Icon className="material-icons-round">delete</Icon>
                                                            </SuiButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                            <Box component="tfoot">
                                                <TableRow>
                                                    <TableCell colSpan={2}>
                                                        <SuiTypography variant="subtitle2" component="div">Total</SuiTypography>
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">{itemTable.totQty}</SuiTypography>
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">{itemTable.totAmt}</SuiTypography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <SuiTypography variant="subtitle2" component="div">Action</SuiTypography>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ border: "none" }}>
                                                    <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">Discount</SuiTypography>
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "right" }}>
                                                        <Controller
                                                            name="dis_amt"
                                                            control={control}
                                                            defaultValue="0"
                                                            render={({ field, fieldState }) => {
                                                                return (
                                                                    <>
                                                                        <SuiInput
                                                                            {...field}
                                                                            size="small"
                                                                            onChange={(e) => {
                                                                                field.onChange(e.target.value);
                                                                                updateCalculate();
                                                                            }}
                                                                            error={fieldState.invalid}
                                                                        />
                                                                        <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                                    </>
                                                                )
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                                <TableRow style={{ border: "none" }}>
                                                    <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">Vat Rate</SuiTypography>
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "right" }}>
                                                        <Controller
                                                            name="vat_rate"
                                                            control={control}
                                                            defaultValue="0"
                                                            render={({ field, fieldState }) => {
                                                                return (
                                                                    <>
                                                                        <SuiInput
                                                                            {...field}
                                                                            size="small"
                                                                            onChange={(e) => {
                                                                                field.onChange(e.target.value);
                                                                                updateCalculate();
                                                                            }}
                                                                            error={fieldState.invalid} />
                                                                        <SuiTypography textColor="error" variant="caption" component="span">{fieldState.error?.message}</SuiTypography>
                                                                    </>
                                                                )
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                                <TableRow style={{ border: "none" }}>
                                                    <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">Grand Total</SuiTypography>
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "right" }}>
                                                        {itemTable.gtAmt}
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </Box>
                                        </Table>
                                    </TableContainer>
                                </Grid>

                                <Grid item xs={9}>
                                    {errorList}
                                </Grid>
                                <Grid item xs={3}>
                                    <SuiButton style={{ float: "right" }} type="submit" buttonColor={isNewSales ? "primary" : "secondary"}>
                                        {isNewSales ? "Save" : "Update"}
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

SalesForm.defaultProps = {
    isNewSales: true,
};

SalesForm.propTypes = {
    isNewSales: PropTypes.bool,
    control: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmitHandler: PropTypes.func.isRequired,
};

export default SalesForm;