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


async function getSalesList(param) {
    return await getApiRequest({
        url: "/store/sales",
        data: {
            ...param
        }
    }).then((result) => {
        return result;
    });
}

async function getSalesDetail(id) {
    return await getApiRequest({
        url: "/store/sales/" + id + "?expand=sitems,payments"
    }).then((result) => {
        return result;
    });
}

async function getSalesDelete(id) {
    return await getApiRequest({
        url: "/store/sales/delete/?id=" + id,
        method: "delete"
    }).then((result) => {
        return result;
    });
}

async function addSales(idata) {
    return await getApiRequest({
        url: "/store/sales/create",
        method: "post",
        data: getJsonForm(idata),
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}

async function updateSales(id, idata) {
    const fdata = getJsonForm(idata);
    return await getApiRequest({
        url: "/store/sales/update/?id=" + id,
        method: "patch",
        data: fdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}

async function getCustomerList(param) {
    return await getApiRequest({
        url: "/store/customer/list",
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


async function getSalesStatus(param) {
    return await getApiRequest({
        url: "/store/sales/status",
        data: {
            'q': param
        }
    }).then((result) => {
        return result;
    });
}

async function getAddPayment(id, idata) {
    return await getApiRequest({
        url: "/store/sales/addpayment/?id=" + id,
        method: "post",
        data: idata
    }).then((result) => {
        return result;
    });
}

async function returnSales(id, idata) {
    return await getApiRequest({
        url: "/store/sales/return/?id=" + id,
        method: "post",
        data: getJsonForm(idata),
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}


export {
    getSalesList,
    getSalesDetail,
    addSales,
    updateSales,
    getSalesDelete,
    getCustomerList,
    getStoreList,
    getItemList,
    getSalesStatus,
    getAddPayment,
    returnSales
};