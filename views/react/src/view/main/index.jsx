import { Suspense } from 'react';
import { Route } from 'react-router-dom';

import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import routes from "links/routes";
import Sidenav from "layouts/Sidenav";
import { itemPage } from "links/pages";
import ProgressBar from "components/ProgressBar";

function MainController() {
    console.log("i am main controller");
    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }
            if (route.route) {
                return <Route path={route.route} component={route.component} key={route.key} />;
            }
            return null;
        });
    return (
        <div key="MainController">
            <Sidenav key="Sidenav" />
            <DashboardLayout key="DashboardLayout">
                <DashboardNavbar key="DashboardNavbar" isMini={false} absolute={false} light={true} />
                <Suspense fallback={
                    <ProgressBar />
                }>
                    {getRoutes(routes)}
                </Suspense>
            </DashboardLayout>
        </div >
    );
}

export default MainController;