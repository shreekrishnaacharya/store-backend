import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Custom styles for the SidenavCollapse
import styles from "./styles/sidenavCollapse";

// Soft UI Dashboard React context
function SidenavCollapse({ icon, name, children, active, noCollapse, deep, open, miniSidenav, ...rest }) {
  const [sopen, setSopen] = useState(false);
  const classes = styles({
    active,
    noCollapse,
    open: sopen,
    miniSidenav,
    children
  });
  const handleClick = () => {
    setSopen(!sopen);
  };

  return (
    <>
      <ListItem component="li" onClick={handleClick}>
        <SuiBox {...rest} customClass={classes.collapse_item}>
          {deep == 0 && (
            <ListItemIcon className={classes.collapse_iconBox}>
              <Icon className={classes.collapse_icon}>{icon}</Icon>
            </ListItemIcon>
          )}
          {deep == 1 && (
            <ListItemIcon className={classes.collapse_iconList}>
              <Icon className={classes.icon_list}></Icon>
            </ListItemIcon>
          )}
          {deep > 1 && (
            <ListItemIcon className={classes.collapse_iconEmpty} />
          )}
          <ListItemText primary={name} classes={{ root: classes.collapse_text }} />
          {children && (sopen ? <ExpandLess /> : <ExpandMore />)}
        </SuiBox>
      </ListItem>
      {
        children && (
          <Collapse in={sopen} unmountOnExit>
            {children}
          </Collapse>
        )
      }
    </>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false,
  noCollapse: true,
  children: false,
  open: false,
  deep: 0
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
};

export default SidenavCollapse;
