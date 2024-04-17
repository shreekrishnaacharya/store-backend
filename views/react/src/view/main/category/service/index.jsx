import { getApiRequest as getApi, getJsonForm } from '_services';


const getApiRequest = async (requestData) => {
    const result = await getApi({
        ...requestData
    }).then(function (response) {
        return { flag: true, headers: response.headers, status: response.status, message: "Success", data: response.data };
    }).then(function (finalJson) {
        return finalJson;
    }).catch((error) => {
        return { flag: false, status: error.status, message: "Error", data: error.data };
    });
    return result;
}



async function getCategoryList(param) {
    return await getApiRequest({
        url: "/store/category",
        data: {
            ...param
        }
    }).then((result) => {
        return result;
    });
}

async function getCategoryDetail(id) {
    return await getApiRequest({
        url: "/store/category/view?id=" + id
    }).then((result) => {
        return result;
    });
}

async function getCategoryDelete(id) {
    return await getApiRequest({
        url: "/store/category/delete?id=" + id,
        method: "delete"
    }).then((result) => {
        return result;
    });
}

async function addCategory(idata) {
    
    return await getApiRequest({
        url: "/store/category/create",
        method: "post",
        data: idata,
    }).then((result) => {
        return result;
    });
}

async function updateCategory(id, idata) {
    const fdata = getJsonForm(idata);
    return await getApiRequest({
        url: "/store/category/update?id=" + id,
        method: "patch",
        data: fdata,
    }).then((result) => {
        return result;
    });
}

export {
    getCategoryList,
    getCategoryDetail,
    addCategory,
    updateCategory,
    getCategoryDelete
};