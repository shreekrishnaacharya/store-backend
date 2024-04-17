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


// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
import DefaultNavbarLink from "./DefaultNavbarLink";
import { pagesTitle, sitePage } from "links";
// Custom styles for DashboardNavbar
import styles from "./styles/defaultNavbar";

function DefaultNavbar({ transparent, light, action }) {
  const classes = styles({ transparent, light });
  // const [mobileNavbar, setMobileNavbar] = useState(false);
  // const [mobileView, setMobileView] = useState(false);

  // const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  // const closeMobileNavbar = () => setMobileNavbar(false);

  // useEffect(() => {
  //   // A function that sets the display state for the DefaultNavbarMobile.
  //   function displayMobileNavbar() {
  //     if (window.innerWidth < breakpoints.values.lg) {
  //       setMobileView(true);
  //       setMobileNavbar(false);
  //     } else {
  //       setMobileView(false);
  //       setMobileNavbar(false);
  //     }
  //   }

  //   /** 
  //    The event listener that's calling the displayMobileNavbar function when 
  //    resizing the window.
  //   */
  //   window.addEventListener("resize", displayMobileNavbar);

  //   // Call the displayMobileNavbar function to set the state with the initial value.
  //   displayMobileNavbar();

  //   // Remove event listener on cleanup
  //   return () => window.removeEventListener("resize", displayMobileNavbar);
  // }, []);

  return (
    <Container>
      <SuiBox
        customClass={classes.defaultNavbar}
        py={1}
        px={{ xs: transparent ? 4 : 5, sm: transparent ? 2 : 5, lg: transparent ? 0 : 5 }}
      >
        <SuiBox component={Link} to="/" py={transparent ? 1.5 : 0.75}>
          <SuiTypography variant="button" fontWeight="bold" textColor={light ? "white" : "dark"}>
            {pagesTitle.SITE_TITLE}
          </SuiTypography>
        </SuiBox>
        <SuiBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <DefaultNavbarLink
            icon="account_circle"
            name="sign up"
            route={sitePage.SIGNUP}
            light={light}
          />
          <DefaultNavbarLink
            icon="key"
            name="sign in"
            route={sitePage.LOGIN}
            light={light}
          />
        </SuiBox>
        {/* <SuiBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          customClass="cursor-pointer"
          onClick={openMobileNavbar}
        >
          <Icon fontSize="medium">{mobileNavbar ? "close" : "menu"}</Icon>
        </SuiBox> */}
      </SuiBox>
      {/* {mobileView && (
        <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar}>
          Hello
        </DefaultNavbarMobile>
      )} */}
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "white",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
