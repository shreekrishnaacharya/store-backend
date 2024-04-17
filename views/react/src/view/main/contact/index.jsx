import { Route } from 'react-router-dom';
import { contactPage } from "links";
import ContactList from './view/list';
import ContactAdd from './view/create';
import ContactUpdate from './view/update';
import ContactView from './view/view';

function ContactController() {
    return (
        <>
            <Route exact path={contactPage.CONTACT_LIST} component={ContactList} />
            <Route exact path={contactPage.CONTACT_UPDATE} component={ContactUpdate} />
            <Route exact path={contactPage.CONTACT_VIEW} component={ContactView} />
            <Route exact path={contactPage.CONTACT_ADD} component={ContactAdd} />
        </>
    );
}
export default ContactController;