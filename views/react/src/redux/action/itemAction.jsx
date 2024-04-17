import { ActionTypes } from "../contants/action-types"

const setItemList = (itemList) => {
    return {
        type: ActionTypes.ITEM_LIST,
        payload: itemList
    }
};


const setItemDetail = (item) => {
    return {
        type: ActionTypes.ITEM_DETAIL,
        payload: item
    }
};
export { setItemList, setItemDetail }
