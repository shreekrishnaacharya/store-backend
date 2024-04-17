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

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React example components
import Breadcrumbs from "layouts/Breadcrumbs";
import NotificationItem from "layouts/NotificationItem";

// Custom styles for DashboardNavbar
import styles from "./styles";
import { pagesTitle, pages } from "links";

// Soft UI Dashboard React context
import { useDispatch, useSelector } from "react-redux";
import { setMiniSideNav } from "redux/action/menuAction";
// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
function DashboardNavbar({ absolute, light, isMini, backGround }) {
  // const [navbarType, setNavbarType] = useState();
  const navbarType = "top";
  const dispatch = useDispatch();
  const controller = useSelector(sta => sta.menu);
  const { miniSidenav, fixedNavbar, transparentNavbar } = controller;
  // const [openMenu, setOpenMenu] = useState(false);
  const classes = styles({ absolute, light, isMini, transparentNavbar, backGround });
  const pathnam = useLocation().pathname;
  const route = pathnam.split("/").slice(1);
  let pTitle = pagesTitle[getKeyByValue(pages, pathnam)];
  if (pTitle === undefined) {
    pTitle = route[route.length - 1];
    pTitle = pTitle.replace("-", " ");
  }


  const handleMiniSidenav = () => dispatch(setMiniSideNav(!miniSidenav));
  // const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  // const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     getContentAnchorEl={null}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "left",
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     style={{ marginTop: "1rem" }}
  //   >
  //     <NotificationItem
  //       image={<img src={team2} alt="person" />}
  //       title={["New message", "from Laur"]}
  //       date="13 minutes ago"
  //       onClick={handleCloseMenu}
  //     />
  //     <NotificationItem
  //       image={<img src={logoSpotify} alt="person" />}
  //       title={["New album", "by Travis Scott"]}
  //       date="1 day"
  //       onClick={handleCloseMenu}
  //     />
  //     <NotificationItem
  //       color="secondary"
  //       image={
  //         <Icon fontSize="small" className="material-icon-round text-white">
  //           payment
  //         </Icon>
  //       }
  //       title={["", "Payment successfully completed"]}
  //       date="2 days"
  //       onClick={handleCloseMenu}
  //     />
  //   </Menu>
  // );
  console.log("I am top nav");
  return (
    <AppBar
      position={"static"}
      color="inherit"
      className={classes.navbar}
    >
      <Toolbar className={classes.navbar_container}>
        <SuiBox customClass={classes.navbar_row} color="inherit" mb={{ xs: 1, md: 0 }}>
          <Breadcrumbs icon="home" title={pTitle} route={route} light={light} />
          <IconButton
            size="small"
            color="inherit"
            className={classes.navbar_desktop_menu}
            onClick={handleMiniSidenav}
          >
            <Icon>{miniSidenav ? "menu_open" : "menu"}</Icon>
          </IconButton>
        </SuiBox>
        {isMini ? null : (
          <SuiBox customClass={classes.navbar_row}>
            <SuiBox pr={1}>
              <SuiInput
                placeholder="Type here..."
                withIcon={{ icon: "search", direction: "left" }}
                customClass={classes.navbar_input}
              />
            </SuiBox>
            <SuiBox
              color={light ? "white" : "inherit"}
              customClass={classes.navbar_section_desktop}
            >
              <IconButton
                color="inherit"
                className={classes.navbar_icon_button}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
              // onClick={handleOpenMenu}
              >
                <Icon>notifications</Icon>
              </IconButton>
              {/* {renderMenu()} */}
            </SuiBox>
          </SuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
