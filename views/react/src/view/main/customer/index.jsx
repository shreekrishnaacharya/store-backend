import { Route } from 'react-router-dom';
import { customerPage } from "links";
import CustomerList from './view/list';
import CustomerAdd from './view/create';
import CustomerUpdate from './view/update';
import CustomerView from './view/view';

function CustomerController() {
    return (
        <>
            <Route exact path={customerPage.CUSTOMER_LIST} component={CustomerList} />
            <Route exact path={customerPage.CUSTOMER_UPDATE} component={CustomerUpdate} />
            <Route exact path={customerPage.CUSTOMER_VIEW} component={CustomerView} />
            <Route exact path={customerPage.CUSTOMER_ADD} component={CustomerAdd} />
        </>
    );
}

export default CustomerController;