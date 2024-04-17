import { useEffect } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";

// @mui material components
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
import SidenavCollapse from "./SidenavCollapse";

// Custom styles for the Sidenav
import styles from "./styles/sidenav";

// Images
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

import { pagesTitle } from "links/titles";
import { pages } from "links/pages";
// Soft UI Dashboard React context
import { useDispatch, useSelector } from "react-redux";
import { setMiniSideNav } from "redux/action/menuAction";
import routes from "links/routes";

function Sidenav() {
  const dispatch = useDispatch();
  const controller = useSelector(sta => sta.menu);
  const { miniSidenav } = controller;
  // const miniSidenav = false;
  const classes = styles({ miniSidenav });
  const location = useLocation();
  const { pathname } = location;
  const collapseNameList = pathname.split("/").slice(1);

  // const closeSizenav = () => dispatch(setMiniSideNav(true));
  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      dispatch(setMiniSideNav(window.innerWidth < 1200));
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, []);


  console.log("I am side nav");
  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const reRender = (rout, deep, isActivePar) => {

    ++deep;
    return rout.map(({ type, name, icon, title, noCollapse, key, rid, route, href, collapse }) => {
      let returnValue;
      const isActive = isActivePar && collapseNameList[deep] === rid;
      if (type === "collapse") {
        if (href) {
          returnValue = (<Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            className={classes.sidenav_navlink}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={isActive}
              noCollapse={noCollapse}
              deep={deep}
            />
          </Link>);
        }
        if (!collapse) {
          returnValue = (<NavLink to={route} key={key} className={classes.sidenav_navlink}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={isActive}
              noCollapse={noCollapse}
              deep={deep}
            />
          </NavLink >);
        } else {
          returnValue = (
            <SidenavCollapse
              name={name}
              icon={icon}
              active={isActive}
              noCollapse={noCollapse}
              deep={deep}
            >
              <List>
                {
                  reRender(collapse, deep, isActive)
                }
              </List>
            </SidenavCollapse>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <SuiTypography
            key={key}
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            customClass={classes.sidenav_title}
          >
            {title}
          </SuiTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} />;
      } else {
        returnValue = (<NavLink to={route} key={key} className={classes.sidenav_navlink}>
          <SidenavCollapse
            name={name}
            icon={icon}
            active={isActive}
            noCollapse={noCollapse}
            deep={deep}
          />
        </NavLink >);
      }

      return returnValue;
    });
  };

  const renderRoutes = reRender(routes, -1, true);
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.sidenav, {
          [classes.sidenav_open]: !miniSidenav,
          [classes.sidenav_close]: miniSidenav,
        }),
      }}
    >
      <SuiBox customClass={classes.sidenav_header}>
        <SuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          customClass="cursor-pointer"
        // onClick={closeSizenav}
        >
          <SuiTypography variant="h6" textColor="secondary">
            <Icon className="font-bold">close</Icon>
          </SuiTypography>
        </SuiBox>
        <NavLink to={pages.DASHBOARD}>
          {/* <SuiBox
            component="img"
            src={StoreMallDirectoryIcon}
            alt={pagesTitle.SITE_TITLE}
            customClass={classes.sidenav_logo}
          /> */}
          <StoreMallDirectoryIcon fontSize="large" />
          <SuiBox customClass={classes.sidenav_logoLabel}>
            <SuiTypography component="h6" variant="button" fontWeight="medium">
              {pagesTitle.SITE_TITLE}
            </SuiTypography>
          </SuiBox>
        </NavLink>
      </SuiBox>
      <Divider />
      <List>{renderRoutes}</List>
      <hr />
      <p style={{ fontSize: 12, padding: 20 }}>Developer <a href="https://www.linkedin.com/in/krishna-acharya-0a10a514b/">Krishna Acharya</a></p>
    </Drawer>
  );
}

export default Sidenav;
