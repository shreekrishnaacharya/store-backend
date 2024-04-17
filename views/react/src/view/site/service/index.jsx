import { getApiRequest as getApi } from '_services/apiCall';

const getApiRequest = async (requestData) => {
    const result = await getApi({
        ...requestData
    }).then(function (response) {
        // return response.data;
        return { flag: true, status: response.status, message: "Success", data: response.data };
    }).then(function (finalJson) {
        return finalJson;
    }).catch((res) => {
        // return error.data;
        return { flag: false, status: res.status, message: res.data ? res.data.message : "Error", data: res.data };
    });
    return result;
}



async function getLogin(form) {
    return await getApiRequest({
        url: "/store/auth/login",
        data: form,
        method: "post"
    }).then((result) => {
        return result;
    });
}

async function getSignup(form) {
    return await getApiRequest({
        url: "/store/auth/signup/",
        method: "post",
        data: form
    }).then((result) => {
        return result;
    });
}


async function getUserByEmail(fdata) {
    return await getApiRequest({
        url: "/store/auth/forgot",
        data: fdata,
        method: "post"
    }).then((result) => {
        return result;
    });
}


async function getVerifyToken(fdata) {
    return await getApiRequest({
        url: "/store/auth/verify-code",
        data: {
            ...fdata
        },
        method: "post"
    }).then((result) => {
        return result;
    });
}

async function getNewPassword(fdata) {
    return await getApiRequest({
        url: "/store/auth/change-password",
        data: {
            ...fdata
        },
        method: "post"
    }).then((result) => {

        return result;
    });
}

export {
    getLogin,
    getSignup,
    getUserByEmail,
    getVerifyToken,
    getNewPassword
};
