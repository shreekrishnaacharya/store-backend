/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Custom styles for the LayoutContainer
import styles from "layouts/LayoutContainers/DashboardLayout/styles";

// Soft UI Dashboard React context
import { useSelector } from "react-redux";

function LayoutContainer({ children }) {
  const controller = useSelector(sta => sta.menu);
  const { miniSidenav } = controller;
  const classes = styles({ miniSidenav });
  return <SuiBox customClass={classes.layoutContainer}>{children}</SuiBox>;
}

// Typechecking props for the LayoutContainer
LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContainer;
