
// Soft UI Dashboard React example components
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CategoryForm from "./_form";
import { useHistory } from "react-router-dom";
import { categoryPage } from "links/pages";
// Custom styles for the Tables

// Service
import { addCategory } from "../service"


const schema = yup.object({
    name: yup.string().required("Name cannot be blank").max(100),
    code: yup.string().required("Code cannot be blank").max(100),
});

function CategoryAdd() {
    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    async function onSubmitHandler(fdata) {
        await addCategory(fdata).then(({ flag, data }) => {
            if (flag==false) {
                enqueueSnackbar("Category add success", {
                    variant: 'success',
                });
                history.push({
                    pathname: categoryPage.CATEGORY_LIST,
                    state: {
                        id: data.id,
                        name: data.name
                    }
                });
            }
        })
    };
    return (
        <CategoryForm
            onSubmitHandler={onSubmitHandler}
            handleSubmit={handleSubmit}
            control={control}
            errors={errors}
            getValues={getValues}
        />
    );
}

export default CategoryAdd;
