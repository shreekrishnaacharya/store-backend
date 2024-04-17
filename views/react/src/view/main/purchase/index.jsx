import { Route } from 'react-router-dom';
import { purchasePage } from "links/pages";
import PurchaseList from './view/list';
import PurchaseAdd from './view/create';
// import PurchaseUpdate from './view/update';
import PurchaseView from './view/view';
import PurchaseReturn from './view/return';

function PurchaseController() {
    return (
        <>
            <Route exact path={purchasePage.PURCHASE_LIST} component={PurchaseList} />
            <Route exact path={purchasePage.PURCHASE_ADD} component={PurchaseAdd} />
            <Route exact path={purchasePage.PURCHASE_VIEW} component={PurchaseView} />
            <Route exact path={purchasePage.PURCHASE_RETURN} component={PurchaseReturn} />
        </>
    );
}

export default PurchaseController;