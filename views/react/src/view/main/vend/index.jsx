import React from 'react';
import { Route } from 'react-router-dom';
import { vendPage } from "links";
import VendList from './view/list';
import VendAdd from './view/create';
import VendUpdate from './view/update';
import VendView from './view/view';


function VendController() {
    return (
        <>
            <Route exact path={vendPage.VEND_ADD} component={VendAdd} />
            <Route exact path={vendPage.VEND_LIST} component={VendList} />
            <Route exact path={vendPage.VEND_UPDATE} component={VendUpdate} />
            <Route exact path={vendPage.VEND_VIEW} component={VendView} />
        </>
    );
}

export default VendController;
