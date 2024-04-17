import { getApiRequest as getApi, getUpdateKey } from '_services';


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
        url: "/store/customer/view?id=" + id
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
    const fdata = getUpdateKey(idata, { name: "nam", address: "ads", remark: "rmk" });
    return await getApiRequest({
        url: "/store/customer/create",
        method: "post",
        data: fdata,
    }).then((result) => {
        return result;
    });
}

async function updateCustomer(id, idata) {
    const fdata = getUpdateKey(idata, { name: "nam", address: "ads", remark: "rmk" });
    return await getApiRequest({
        url: "/store/customer/update?id=" + id,
        method: "patch",
        data: fdata,
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