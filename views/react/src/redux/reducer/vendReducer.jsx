import { ActionTypes } from "../contants/action-types"
const initList = {
    vends: null,
    pg: {
        size: null,
        pages: null,
        current: null,
        total: null
    }
}

export const vendListReducer = (state = initList, { type, payload }) => {
    switch (type) {
        case ActionTypes.VEND_LIST:
            return { ...state, ...payload };
        default:
            return state;
    }
}

export const vendDetailReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.VEND_DETAIL:
            return { ...payload };
        default:
            return state;
    }
}