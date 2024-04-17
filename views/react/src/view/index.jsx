import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { pages } from "links/pages";
import MainController from "view/main";
import SiteController from "view/site";

function StoreController() {
    return (
        <Switch>
            <Route path={pages.GUEST} component={SiteController} />
            <Route path="*" component={MainController} />
        </Switch>
    );
}

export default StoreController;