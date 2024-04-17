import axios from "axios";
import { pages } from "links/pages";
// const BASE_URL = "https://airflight.herokuapp.com/";
const getApiRequest = async (options) => {
    const { headers } = options;
    let optObj = {
        baseURL: pages.BASE_URL,
        url: "/",
        method: "GET",
        data: {},
        params: {},
        ...options,
        headers: {
            'Authorization': `Bearer ${window.store_access_token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        },
    };
    // console.log("Req Data:", optObj.data);
    if ((optObj.method).toLowerCase() === "get") {
        optObj.params = {
            ...optObj.data
        };
        delete optObj.data;
    } else {
        optObj.method = "POST";
    }
    const response = await axios({
        ...optObj
    });
    // console.log("Res Data:", response);

    return response;
}
export { getApiRequest };
