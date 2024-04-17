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

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

const { white } = colors;
const { borderRadius, borderWidth } = borders;
const { light } = colors;

export default {
  styleOverrides: {
    root: {
      backgroundColor: white.main,
      borderBottom: `${borderWidth[1]} solid ${light.main}`,
      borderRadius: borderRadius.xl,
    },
  },
};
