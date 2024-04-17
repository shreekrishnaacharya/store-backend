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

async function getVendorList(param) {
    return await getApiRequest({
        url: "/store/vend/list",
        data: {
            'q': param
        }
    }).then((result) => {
        return result;
    });
}

async function getItemList(param) {
    return await getApiRequest({
        url: "/store/items",
        data: {
            ...param
        }
    }).then((result) => {
        return result;
    });
}

async function getItemDetail(id) {
    return await getApiRequest({
        url: "/store/items/" + id + "?expand=vends"
    }).then((result) => {
        return result;
    });
}

async function getItemDelete(id) {
    return await getApiRequest({
        url: "/store/items/delete/?id=" + id,
        method: "delete"
    }).then((result) => {
        return result;
    });
}

async function getVendorDelete(id) {
    return await getApiRequest({
        url: "/store/item/delete-vend?id=" + id,
        method: "delete"
    }).then((result) => {
        return result;
    });
}

async function getVendorUpdate(id, idata) {
    return await getApiRequest({
        url: "/store/item/update-vend?id=" + id,
        method: "patch",
        data: idata
    }).then((result) => {
        return result;
    });
}

async function addItem(idata) {
    return await getApiRequest({
        url: "/store/items",
        method: "post",
        data: idata
    }).then((result) => {
        return result;
    });
}

async function updateItem(id, idata) {
    const fdata = getJsonForm(idata);
    return await getApiRequest({
        url: "/store/item/update/?id=" + id,
        method: "patch",
        data: fdata
    }).then((result) => {
        return result;
    });
}

export {
    getItemList,
    getItemDetail,
    addItem,
    updateItem,
    getItemDelete,
    getVendorList,
    getVendorDelete,
    getVendorUpdate
};