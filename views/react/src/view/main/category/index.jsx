import React from 'react';
import { Route } from 'react-router-dom';
import { categoryPage } from "links";
import CategoryList from './view/list';
import CategoryAdd from './view/create';
import CategoryUpdate from './view/update';


function CategoryController() {
    return (
        <>
            <Route exact path={categoryPage.CATEGORY_ADD} component={CategoryAdd} />
            <Route exact path={categoryPage.CATEGORY_LIST} component={CategoryList} />
            <Route exact path={categoryPage.CATEGORY_UPDATE} component={CategoryUpdate} />
        </>
    );
}

export default CategoryController;
