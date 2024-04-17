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

import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Soft UI Dashboard React components
import Box from "@mui/material/Box";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";


function Table({ columns, rows }) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name, label, align }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }
    return (
      <Box
        key={name}
        component="th"
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="primary"
        opacity={0.9}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {label ? label : name.toUpperCase()}
      </Box>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;
    const tableRow = columns.map(({ name, align }) => {
      if (!row.hasOwnProperty(name)) {
        return;
      }
      let tdata = row[name];
      let tdprops = {};
      let tdstyle = { padding: 5, margin: 2, textAlign: align };
      if (Array.isArray(tdata)) {
        tdata = row[name][1];
        tdprops = row[name][0];
      }
      if (tdprops["style"]) {
        tdstyle = { ...tdstyle, ...tdprops["style"] };
      }
      return (<td key={name + key}  {...tdprops} style={tdstyle}>
        {tdata}</td>);
    });
    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <Box component="thead"
            // sx={{
            //   backgroundColor: '#eee'
            // }}
          >
            <TableRow>{renderColumns}</TableRow>
          </Box>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ), [columns, rows]);
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
