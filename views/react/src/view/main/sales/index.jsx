import { Route } from 'react-router-dom';
import { salesPage } from "links/pages";
import SalesList from './view/list';
import SalesAdd from './view/create';
import SalesView from './view/view';
import SalesReturn from './view/return';
// alert(salesPage.SALES_LIST);
function SalesController() {
    return (
        <>
            <Route exact path={salesPage.SALES_LIST} component={SalesList} />
            <Route exact path={salesPage.SALES_ADD} component={SalesAdd} />
            <Route exact path={salesPage.SALES_VIEW} component={SalesView} />
            <Route exact path={salesPage.SALES_RETURN} component={SalesReturn} />
        </>
    );
}

export default SalesController;