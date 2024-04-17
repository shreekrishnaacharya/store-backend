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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
import DefaultNavbar from "layouts/Navbars/DefaultNavbar";
import PageLayout from "layouts/LayoutContainers/PageLayout";


// Custom styles for the Baise
import styles from "./styles";

// Soft UI Dashboard React page layout routes

function CoverLayout({ color, header, title, description, image, top, children, minHeight }) {
  const classes = styles({ image, minHeight });

  return (
    <PageLayout background="white">
      <DefaultNavbar />
      <Grid container justifyContent="center" className={classes.coverLayout}>
        <Grid item xs={11} sm={8} md={5} xl={3}>
          <SuiBox mt={top}>
            <SuiBox pt={3} px={3}>
              {!header ? (
                <>
                  <SuiBox mb={1}>
                    <SuiTypography variant="h3" fontWeight="bold" textColor={color} textGradient>
                      {title}
                    </SuiTypography>
                  </SuiBox>
                  <SuiTypography variant="body2" fontWeight="regular" textColor="text" warpLength={20}>
                    {description}
                  </SuiTypography>
                </>
              ) : (
                header
              )}
            </SuiBox>
            <SuiBox p={3}>{children}</SuiBox>
          </SuiBox>
        </Grid>
        <Grid item xs={12} md={5}>
          <SuiBox
            display={{ xs: "none", md: "block" }}
            position="relative"
            right={{ md: "-12rem", xl: "-16rem" }}
            customClass={classes.coverLayout_imageBox}
          >
            <SuiBox customClass={classes.coverLayout_image} />
          </SuiBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 10,
  minHeight: 70
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
  minHeight: PropTypes.number,
};

export default CoverLayout;
