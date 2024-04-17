
// Soft UI Dashboard React example components
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ItemForm from "./_form";
import { useHistory } from "react-router-dom";
import { itemPage } from "links/pages";
// Custom styles for the Tables

// Service
import { addItem } from "../service";

const schema = yup.object({
    image: yup.mixed().test("fileSize", "Max file size is 1MB", (value, ob1) => {
        return !value || value[0].size < 1200000;
    }).test("type", "Only jpg,jpeg and png are supported", (value) => {
        return !value || (value[0].type === "image/jpeg" || value[0].type === "image/jpg" || value[0].type === "image/png");
    }),
    name: yup.string().required().max(100).label('Name'),
    code: yup.string().required().max(100).label('Code'),
    min_qty: yup.number().positive().integer().required().label('Min Qty'),
    expire_time: yup.number().positive().integer().label('Life must'),
    sprice: yup.number().positive().required().label('Selling price'),
    qty_typ: yup.number().positive().required().label('Unit Type'),
    vendor: yup.array()
        .of(yup.object().shape({
            id: yup.mixed().required().label('Vendor'),
            price: yup.number().required().label("Cast Price")
        })),
});

function ItemAdd() {
    const { formState: { errors }, ...restForm } = useForm({
        resolver: yupResolver(schema),
        // defaultValues: {
        //     name: "name",
        //     code: "code",
        //     min_qty: 23,
        //     expire_time: 44,
        //     image: itemData.image,
        // }
    });
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    async function onSubmitHandler(fdata) {
        await addItem(fdata).then(({ flag, data }) => {
            if (flag) {
                enqueueSnackbar("Item add success", {
                    variant: 'success',
                });
                history.push({
                    pathname: itemPage.ITEM_VIEW,
                    search: "?" + (data.name.replace(" ", "-").toLowerCase()),
                    state: {
                        id: data.id,
                        name: data.name
                    }
                });
            }
        })
    };
    return (
        <ItemForm
            {...restForm}
            onSubmitHandler={onSubmitHandler}
            errors={errors}
        />
    );
}

export default ItemAdd;
