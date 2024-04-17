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

async function getCustomerList(param) {
    return await getApiRequest({
        url: "/store/customer",
        data: {
            ...param
        }
    }).then((result) => {
        return result;
    });
}

async function getCustomerDetail(id) {
    return await getApiRequest({
        url: "/store/customer/view?id=" + id + "&expand=bills,balance"
    }).then((result) => {
        return result;
    });
}

async function getCustomerDelete(id) {
    return await getApiRequest({
        url: "/store/customer/delete?id=" + id,
        method: "delete"
    }).then((result) => {
        return result;
    });
}

async function addCustomer(idata) {
    idata["nam"] = idata["name"];
    idata["ads"] = idata["address"];
    delete idata["name"];
    delete idata["address"];
    return await getApiRequest({
        url: "/store/customer/create",
        method: "post",
        data: getJsonForm(idata),
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}

async function updateCustomer(id, idata) {
    idata["nam"] = idata["name"];
    idata["ads"] = idata["address"];
    delete idata["name"];
    delete idata["address"];
    const fdata = getJsonForm(idata);
    return await getApiRequest({
        url: "/store/customer/update?id=" + id,
        method: "patch",
        data: fdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}

export {
    getCustomerList,
    getCustomerDetail,
    addCustomer,
    updateCustomer,
    getCustomerDelete
};