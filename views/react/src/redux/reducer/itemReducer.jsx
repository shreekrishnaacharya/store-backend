import { ActionTypes } from "../contants/action-types"
const initList = {
    items: null,
    pg: {
        size: null,
        pages: null,
        current: null,
        total: null
    }
}

// const initList = [];


export const itemListReducer = (state = initList, { type, payload }) => {
    switch (type) {
        case ActionTypes.ITEM_LIST:
            return { ...state, ...payload };
        default:
            return state;
    }
}

export const itemDetailReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.ITEM_DETAIL:
            return { ...payload };
        default:
            return state;
    }
}