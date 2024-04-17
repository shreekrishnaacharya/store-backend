import { Route, Switch } from 'react-router-dom';
import { pages } from "links/pages";
import Profile from './view/profile';

function UserController() {
    return (
        <>
            <Route exact path={pages.PROFILE} component={Profile} />
        </>
    );
}

export default UserController;