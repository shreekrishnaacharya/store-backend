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

async function getContactList(param) {
    return await getApiRequest({
        url: "/store/contact",
        data: {
            ...param
        }
    }).then((result) => {
        return result;
    });
}

async function getContactDetail(id) {
    return await getApiRequest({
        url: "/store/contact/view?id=" + id
    }).then((result) => {
        return result;
    });
}

async function getContactDelete(id) {
    return await getApiRequest({
        url: "/store/contact/delete?id=" + id,
        method: "delete"
    }).then((result) => {
        return result;
    });
}

async function addContact(idata) {
    idata["ads"] = idata["address"];
    delete idata["address"];
    return await getApiRequest({
        url: "/store/contact/create",
        method: "post",
        data: getJsonForm(idata),
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}

async function updateContact(id, idata) {
    idata["ads"] = idata["address"];
    delete idata["address"];
    const fdata = getJsonForm(idata);
    return await getApiRequest({
        url: "/store/contact/update?id=" + id,
        method: "patch",
        data: fdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((result) => {
        return result;
    });
}

export {
    getContactList,
    getContactDetail,
    addContact,
    updateContact,
    getContactDelete
};