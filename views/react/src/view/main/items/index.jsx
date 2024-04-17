import { Route } from 'react-router-dom';
import { pages } from "links/pages";
import ItemList from './view/list';
import ItemAdd from './view/create';
import ItemUpdate from './view/update';
import ItemView from './view/view';

function ItemController() {
    return (
        <>
            <Route exact path={pages.ITEM_LIST} component={ItemList} />
            <Route exact path={pages.ITEM_UPDATE} component={ItemUpdate} />
            <Route exact path={pages.ITEM_VIEW} component={ItemView} />
            <Route exact path={pages.ITEM_ADD} component={ItemAdd} />
        </>
    );
}

export default ItemController;