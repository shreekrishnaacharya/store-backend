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


// Custom styles for the BaiseLayout
import styles from "./styles";

// Soft UI Dashboard React page layout routes
import routes from "links/routes";

function BasicLayout({ title, description, image, children }) {
  const classes = styles({ image });

  return (
    <PageLayout>
      <DefaultNavbar
        routes={routes}
        transparent
        light
      />
      <SuiBox customClass={classes.basicLayout}>
        <Grid container spacing={3} justifyContent="center" className="text-center">
          <Grid item xs={10} lg={12}>
            <SuiBox mt={1} mb={1}>
              <SuiTypography variant="h1" textColor="white" fontWeight="bold">
                {title}
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={2}>
              <SuiTypography variant="body1" textColor="white" fontWeight="regular" >
                {description}
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mt={{ xs: -30, lg: -30 }} mb={5} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={6} lg={5} xl={4}>
            {children}
          </Grid>
        </Grid>
      </SuiBox>
    </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
