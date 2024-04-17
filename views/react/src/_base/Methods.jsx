
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setLogout } from "redux/action/userAction";
import { pages } from "links/pages";
import BackDrop from "./BackDrop";

const Methods = ({ logout }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutButton = () => {
        dispatch(setLogout());
        history.push(pages.LOGIN);
    }
    if (logout) {
        logoutButton();
    }

    return (<>
        <BackDrop message="Logging out ..." />
    </>)
}

export default Methods;