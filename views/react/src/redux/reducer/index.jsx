import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { menuReducer } from "./menuReducer";
import { itemDetailReducer, itemListReducer } from "./itemReducer";
import { vendDetailReducer, vendListReducer } from "./vendReducer";
import { contactDetailReducer, contactListReducer } from "./contactReducer";
import { navPathReducer } from "./navPathReducer";
import { alertReducer } from "./alertReducer";
import { dboardReducer } from "./dboardReducer";

const reducers = combineReducers({
    user: userReducer,
    menu: menuReducer,
    itemDetail: itemDetailReducer,
    itemList: itemListReducer,
    vendDetail: vendDetailReducer,
    vendList: vendListReducer,
    contactList: contactListReducer,
    contactDetail: contactDetailReducer,
    navPath: navPathReducer,
    alert: alertReducer,
    dboard: dboardReducer
});

export default reducers;