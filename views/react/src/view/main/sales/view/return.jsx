import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import { Box } from "@mui/material";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import FileInput from "components/FileInput";

import Icon from "@mui/material/Icon";
import { returnSales, getSalesDetail } from "../service";
import { purchasePage } from "links/pages";

const schema = yup.object({
    attachfile: yup.mixed().test("fileSize", "Max file size is 1MB", (value, ob1) => {
        return !value || value[0].size < 1200000;
    }).test("type", "Only jpg,jpeg,png,pdf are supported", (value) => {
        return !value || (value[0].type === "image/jpeg" || value[0].type === "image/jpg" || value[0].type === "image/png" || value[0].type === "application/pdf");
    }),
    ptdate: yup.string().required().max(100).label('Date'),
    ref_no: yup.string().label('Referance'),
    rchg: yup.number().typeError('Discount must be a number')
        .min(0, 'Min value 0.').label('Discount'),
    items: yup.array().min(1, "Keep at least 1 item")
});
const SalesReturn = () => {
    const history = useHistory();
    const [saleData, setPurData] = useState({});
    const { id, name } = useSelector(state => state.navPath["curr"]);

    const [itemTable, setItemTable] = useState({ itemList: [], totAmt: 0, gtAmt: 0, totQty: 0 });

    const { formState: { errors }, control, handleSubmit, getValues, setValue } = useForm({
        resolver: yupResolver(schema)
    });
    const { enqueueSnackbar } = useSnackbar();
    async function loadData() {
        await getSalesDetail(id)
            .then((res) => {
                if (res.flag) {
                    setPurData(res.data);
                }
            });
    }

    async function onSubmitHandler(fdata) {
        await returnSales(id, fdata).then(({ flag, data }) => {
            if (flag) {
                enqueueSnackbar("Sales return success", {
                    variant: 'success',
                });
                // history.push({
                //     pathname: purchasePage.SALES_VIEW,
                //     search: "?" + (data.ref_no.replace(" ", "-").toLowerCase()),
                //     state: {
                //         id: data.id,
                //         name: data.ref_no
                //     }
                // });
            } else {
                enqueueSnackbar("Sales return failed", {
                    variant: 'error',
                });
            }
        })
    };
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    useEffect(() => {
        if (Object.keys(saleData).length === 0 && id !== undefined) {
            loadData();
        }
        return () => setPurData({});
    }, []);

    useEffect(() => {
        if (saleData.sitems) {
            saleData.sitems.forEach((val, i) => {
                append({ itemid: val.fsal, name: val.name, cost: val.rate, qty: val.qty });
            });
        }
    }, [saleData]);

    useEffect(() => {
        updateCalculate();
    }, [fields]);

    function updateCalculate() {
        let totQty = 0, totAmt = 0, totVat = 0;
        const surgeAmt = parseFloat(getValues("rchg")) | 0;
        const itemList = getValues("items");
        let itemTotal = [...itemTable.itemList];
        const disAmt = parseFloat(saleData.dis_amt);
        const vatRate = parseFloat(saleData.vat_rate);
        itemList.forEach((val, i) => {
            totQty += parseFloat(val.qty) | 0;
            totAmt += parseFloat(parseFloat(val.cost * val.qty)) | 0;
            itemTotal[i] = parseFloat(val.cost * val.qty);
        });
        totAmt = totAmt - surgeAmt;
        totVat = parseFloat((totAmt - disAmt) * (vatRate / 100));
        const gtAmt = parseFloat(totAmt - disAmt + totVat).toFixed(2);
        setItemTable({ itemList: itemTotal, gtAmt: gtAmt, totAmt: totAmt, totQty: totQty, totVat: (totVat).toFixed(2) });
    }

    return (
        <Box py={3}>
            <Box mb={3}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Card>
                        <Box pt={2} pb={3} px={3}>

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
                                    <SuiTypography variant="subtitle2" component="div">Return Surcharge</SuiTypography>
                                    <Controller
                                        name="rchg"
                                        control={control}
                                        defaultValue="0"
                                        render={({ field, fieldState }) => {
                                            return (
                                                <>
                                                    <SuiInput
                                                        {...field}
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
                                                        <SuiTypography variant="subtitle2" component="div">Return Qty</SuiTypography>
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
                                                        <SuiTypography variant="subtitle2" component="div">-{saleData.dis_amt}</SuiTypography>
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                                <TableRow style={{ border: "none" }}>
                                                    <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">Vat</SuiTypography>
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">{itemTable.totVat}</SuiTypography>
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                                <TableRow style={{ border: "none" }}>
                                                    <TableCell colSpan={3} style={{ textAlign: "right" }}>
                                                        <SuiTypography variant="subtitle2" component="div">Return Amount</SuiTypography>
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
                                <Grid item xs={12}>
                                    <SuiButton style={{ float: "right" }} type="submit" buttonColor="secondary">
                                        Update
                                    </SuiButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </form>
            </Box>
        </Box >
    );
}


export default SalesReturn;