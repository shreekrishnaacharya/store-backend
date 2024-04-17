/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";

// @mui material components
import Typography from "@mui/material/Typography";

// Custom styles for SuiTypography
import styles from "components/SuiTypography/styles";

const SuiTypography = (
  {
    textColor,
    fontWeight,
    textTransform,
    verticalAlign,
    textGradient,
    opacity,
    customClass,
    children,
    warpLength,
    ...rest
  },
  ref
) => {
  const classes = styles({ textColor, textTransform, verticalAlign, opacity, warpLength });

  return (
    <Typography
      {...rest}
      className={clsx(classes.suiTypography, classes.wrapText, customClass, {
        [classes[`suiTypography_${fontWeight}`]]: fontWeight,
        [classes.suiTypography_textTransform]: textTransform,
        [classes.suiTypography_verticalAlign]: verticalAlign,
        [classes.suiTypography_textGradient]: textGradient,
      })}
    >
      {children}
    </Typography>
  );
}

// Setting default values for the props of SuiTypography
SuiTypography.defaultProps = {
  textColor: "dark",
  fontWeight: false,
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
  customClass: "",
  warpLength: 0
};

// Typechecking props for the SuiTypography
SuiTypography.propTypes = {
  textColor: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
  ]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  opacity: PropTypes.number,
  customClass: PropTypes.string,
};

export default SuiTypography;
