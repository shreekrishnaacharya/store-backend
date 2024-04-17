import { ActionTypes } from "../contants/action-types"

const setContactList = (contactList) => {
    return {
        type: ActionTypes.CONTACT_LIST,
        payload: contactList
    }
};


const setContactDetail = (contact) => {
    return {
        type: ActionTypes.CONTACT_DETAIL,
        payload: contact
    }
};
export { setContactList, setContactDetail }
