import { ActionTypes } from "../contants/action-types"
const initList = {
    contacts: null,
    pg: {
        size: null,
        pages: null,
        current: null,
        total: null
    }
}

export const contactListReducer = (state = initList, { type, payload }) => {
    switch (type) {
        case ActionTypes.CONTACT_LIST:
            return { ...state, ...payload };
        default:
            return state;
    }
}

export const contactDetailReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.CONTACT_DETAIL:
            return { ...payload };
        default:
            return state;
    }
}