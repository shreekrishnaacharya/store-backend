
// Soft UI Dashboard React example components
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PurchaseForm from "./_form";
import { useHistory } from "react-router-dom";
import { purchasePage } from "links/pages";
// Custom styles for the Tables

// Service
import { addPurchase } from "../service";

const schema = yup.object({
    attachfile: yup.mixed().test("fileSize", "Max file size is 1MB", (value, ob1) => {
        return !value || value[0].size < 1200000;
    }).test("type", "Only jpg,jpeg,png,pdf are supported", (value) => {
        return !value || (value[0].type === "image/jpeg" || value[0].type === "image/jpg" || value[0].type === "image/png" || value[0].type === "application/pdf");
    }),
    ptdate: yup.string().required().max(100).label('Date'),
    fvend: yup.string().required().max(100).label('Supplier'),
    fstore: yup.number().positive().integer().required().label('Warehouse'),
    pym_term: yup.number().integer().typeError('Payment Terms must be a number')
        .min(0, 'Min value 0.').label('Payment Terms'),
    sts: yup.number().required().label('Status'),
    ref_no: yup.string().label('Referance'),
    remark: yup.string().label('Remark'),
    shipping: yup.string().label('Shipping'),
    dis_amt: yup.number().typeError('Discount must be a number')
        .min(0, 'Min value 0.').label('Discount'),
    vat_rate: yup.number().typeError('Vat must be a number')
        .min(0, 'Min value 0.').label('Vat'),
    items: yup.array().min(1, "Create at least 1 item")
});

function PurchaseAdd() {
    const { formState: { errors }, ...restForm } = useForm({
        resolver: yupResolver(schema)
    });
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    async function onSubmitHandler(fdata) {
        await addPurchase(fdata).then(({ flag, data }) => {
            if (flag) {
                enqueueSnackbar("Purchase add success", {
                    variant: 'success',
                });
                history.push({
                    pathname: purchasePage.PURCHASE_VIEW,
                    search: "?" + (data.ref_no.replace(" ", "-").toLowerCase()),
                    state: {
                        id: data.id,
                        name: data.ref_no
                    }
                });
            } else {
                enqueueSnackbar("Sales add failed", {
                    variant: 'error',
                });
            }
        })
    };
    return (
        <PurchaseForm
            {...restForm}
            onSubmitHandler={onSubmitHandler}
            errors={errors}
        />
    );
}

export default PurchaseAdd;
