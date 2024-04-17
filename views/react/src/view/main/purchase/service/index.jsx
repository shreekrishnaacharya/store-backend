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


async function getPurchaseList(param) {
    return await getApiRequest({
        url: "/store/purchases",
        data: {
            ...param
        }
    }).then((result) => {
        return result;
    });
}

async function getPurchaseDetail(id) {
    return await getApiRequest({
        url: "/store/purchases/" + id + "?expand=pitems,payments"
    }).then((result) => {
        return result;
    });
}

async function getPurchaseDelete(id) {
    return await getApiRequest({
        url: "/store/purchases/?id=" + id,
        method: "delete"
    }).then((result) => {
        return result;
    });
}

async function addPurchase(idata) {
    return await getApiRequest({
        url: "/store/purchases",
        method: "post",
        data: getJsonForm(idata),
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}

async function returnPurchase(id, idata) {
    return await getApiRequest({
        url: "/store/purchase/return/?id=" + id,
        method: "post",
        data: getJsonForm(idata),
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}

async function updatePurchase(id, idata) {
    const fdata = getJsonForm(idata);
    return await getApiRequest({
        url: "/store/purchase/update/?id=" + id,
        method: "patch",
        data: fdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
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

async function getStoreList(param) {
    return await getApiRequest({
        url: "/store/room/list",
        data: {
            'q': param
        }
    }).then((result) => {
        return result;
    });
}

async function getItemList(param) {
    return await getApiRequest({
        url: "/store/item/list",
        data: {
            'q': param
        }
    }).then((result) => {
        return result;
    });
}


async function getPurchaseStatus(param) {
    return await getApiRequest({
        url: "/store/purchase/status",
        data: {
            'q': param
        }
    }).then((result) => {
        return result;
    });
}

async function getAddPayment(id, idata) {
    return await getApiRequest({
        url: "/store/purchase/addpayment/?id=" + id,
        method: "post",
        data: idata
    }).then((result) => {
        return result;
    });
}


export {
    getPurchaseList,
    getPurchaseDetail,
    addPurchase,
    updatePurchase,
    getPurchaseDelete,
    getVendorList,
    getStoreList,
    getItemList,
    getPurchaseStatus,
    getAddPayment,
    returnPurchase
};