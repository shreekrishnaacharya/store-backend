import { ActionTypes } from "../contants/action-types"

const setVendList = (vendList) => {
    return {
        type: ActionTypes.VEND_LIST,
        payload: vendList
    }
};


const setVendDetail = (vend) => {
    return {
        type: ActionTypes.VEND_DETAIL,
        payload: vend
    }
};
export { setVendList, setVendDetail }
