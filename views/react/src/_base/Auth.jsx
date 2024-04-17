import React from 'react';
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { pages, guestPage } from "links/pages";

const Auth = ({ children }) => {
    const userModel = useSelector(state => state.user);
    const location = useLocation();
    const history = useHistory();
    function checkLogin() {
        if (!userModel.isLogin) {
            if (!guestPage.includes(location.pathname)) {
                history.push(pages.LOGIN);
            }
        } else {
            if (guestPage.includes(location.pathname)) {
                history.push(pages.HOME);
            }
        }
        return (
            <div key="AuthController">
                {children}
            </div>
        );
    }
    console.log("I am auth");
    // return (
    //     <div key="AuthController">
    //         {children}
    //     </div>
    // );
    return checkLogin();
}

export default Auth;