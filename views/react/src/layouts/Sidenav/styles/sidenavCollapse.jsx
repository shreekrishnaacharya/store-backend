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

// @mui material components
import { makeStyles } from "@mui/styles";

export default makeStyles(
  ({ palette, transitions, breakpoints, typography, boxShadows, borders, functions }) => {
    const { dark, white, info, text, gradients, light, transparent } = palette;
    const { fontWeightRegular, fontWeightMedium, size } = typography;
    const { regular, xxl } = boxShadows;
    const { borderRadius } = borders;
    const { pxToRem } = functions;

    return {
      collapse_item: {
        background: ({ active }) => (active ? white.main : transparent.main),
        color: ({ active }) => (active ? dark.main : text.main),
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: `${pxToRem(10.8)} ${pxToRem(12.8)} ${pxToRem(10.8)} ${pxToRem(16)}`,
        margin: `0 ${pxToRem(16)}`,
        borderRadius: borderRadius.md,
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        boxShadow: "none",
        [breakpoints.up("xl")]: {
          boxShadow: ({ active, transparentSidenav }) => {
            if (active) {
              return transparentSidenav ? xxl : "none";
            }
            return "none";
          },
          transition: transitions.create("box-shadow", {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.shorter,
          }),
        },
      },
      collapse_iconEmpty: {
        margin: `0 ${pxToRem(10)}`,
        display: "grid",
        minWidth: pxToRem(10),
        minHeight: pxToRem(10),
      },
      collapse_iconList: {
        background: ({ active }) => {
          if (active) {
            return info.main;
          }
          return light.main;
        },
        width: pxToRem(10),
        height: pxToRem(10),
        minWidth: pxToRem(10),
        minHeight: pxToRem(10),
        borderRadius: borderRadius.lg,
        margin: `0 ${pxToRem(10)}`,
        display: "grid",
        placeItems: "center",
      },
      collapse_iconBox: {
        background: ({ active }) => {
          if (active) {
            return palette.info.main;
          }
          return light.main;
        },
        minWidth: pxToRem(32),
        minHeight: pxToRem(32),
        borderRadius: borderRadius.md,
        display: "grid",
        placeItems: "center",
        boxShadow: regular,
        transition: transitions.create("margin", {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
        [breakpoints.up("xl")]: {
          background: ({ active }) => {
            let background;
            if (!active) {
              background = light.main;
            } else {
              background = info.main;
            }
            return background;
          },
        },

        "& svg, svg g": {
          fill: ({ active }) => (active ? white.main : gradients.dark.state),
        },
      },

      collapse_icon: {
        color: ({ active }) => (active ? white.main : gradients.dark.state),
      },

      collapse_text: {
        marginLeft: pxToRem(12.8),
        [breakpoints.up("xl")]: {
          opacity: ({ miniSidenav }) =>
            miniSidenav ? 0 : 1,
          maxWidth: ({ miniSidenav }) =>
            miniSidenav ? 0 : "100%",
          marginLeft: ({ miniSidenav }) =>
            miniSidenav ? 0 : pxToRem(12.8),
          transition: transitions.create(["opacity", "margin"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },

        "& span": {
          fontWeight: ({ active }) => (active ? fontWeightMedium : fontWeightRegular),
          fontSize: size.sm,
          lineHeight: 0,
        },
      },
    };
  }
);
