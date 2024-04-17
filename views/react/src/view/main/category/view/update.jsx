// Soft UI Dashboard React example components
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { categoryPage } from "links/pages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import CategoryForm from "./_form";
// Custom styles for the Tables

// Service
import { updateCategory, getCategoryDetail } from "../service"

const schema = yup.object({
    name: yup.string().required("Name cannot be blank").max(200),
    code: yup.string().required("Code cannot be blank").max(20),
});

function CategoryUpdate() {
    const { enqueueSnackbar } = useSnackbar();
    const [catData, setCatData] = useState({});
    const { id, name } = useSelector(state => state.navPath["curr"]);
    const history = useHistory();
    async function loadData() {
        await getCategoryDetail(id)
            .then((res) => {
                if (res.flag) {
                    const vdData = res.data;
                    reset({
                        name: vdData.name,
                        code: vdData.code,
                    }, {
                        keepDirty: true
                    });
                }
            });
    }
    useEffect(() => {
        if (Object.keys(catData).length === 0 && id !== undefined) {
            loadData();
        }
        return () => setCatData({});
    }, []);


    const { handleSubmit, control, getValues, reset } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        keepDirty: true,
        defaultValues: useMemo(() => {
            return {
                name: catData.name,
                code: catData.code,
            };
        }, [catData])
    });

    async function onSubmitHandler(data) {
        await updateCategory(id, data).then((res) => {
            if (res.flag) {
                enqueueSnackbar("Category update success", {
                    variant: 'success',
                });
                setCatData(res.data);
                history.push({
                    pathname: categoryPage.CATEGORY_LIST,
                    state: {
                        id,
                        name
                    }
                });
            } else {
                enqueueSnackbar("Categoryor update failed", {
                    variant: 'error',
                });
            }
        });
    };
    return (
        <CategoryForm
            onSubmitHandler={onSubmitHandler}
            handleSubmit={handleSubmit}
            control={control}
            isNewCategory={false}
            getValues={getValues}
        />
    );
}

export default CategoryUpdate;
