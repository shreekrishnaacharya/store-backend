import { getApiRequest as getApi } from '_services';


const getApiRequest = async (requestData) => {
    const result = await getApi({
        ...requestData
    }).then(function (response) {
        return { ...response.data };
    }).then(function (finalJson) {
        return finalJson;
    }).catch((error) => {
        return { flag: false, status: error.status, message: "Error", data: error.data };
    });
    return result;
}


async function getDashboard() {
    return await getApiRequest({
        url: "/store/dashboard",
    }).then((result) => {
        return result;
    });
}

export {
    getDashboard
};