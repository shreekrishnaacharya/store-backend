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

async function getVendList(param) {
    return await getApiRequest({
        url: "/store/vend",
        data: {
            ...param
        }
    }).then((result) => {
        return result;
    });
}

async function getVendDetail(id) {
    return await getApiRequest({
        url: "/store/vend/view/?id=" + id + "&expand=bills,balance"
    }).then((result) => {
        return result;
    });
}

async function getVendDelete(id) {
    return await getApiRequest({
        url: "/store/vend/delete/?id=" + id,
        method: "delete"
    }).then((result) => {
        return result;
    });
}

async function addVend(idata) {

    return await getApiRequest({
        url: "/store/vend/create",
        method: "post",
        data: getJsonForm(idata),
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}

async function updateVend(id, idata) {
    const fdata = getJsonForm(idata);
    return await getApiRequest({
        url: "/store/vend/update/?id=" + id,
        method: "patch",
        data: fdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}

export {
    getVendList,
    getVendDetail,
    addVend,
    updateVend,
    getVendDelete
};