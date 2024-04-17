import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavPath } from "redux/action/navAction";
// react-router-dom components
import { Link, useHistory, useLocation } from "react-router-dom";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Custom styles for Breadcrumbs
import styles from "layouts/Breadcrumbs/styles";

function Breadcrumbs({ icon, title, route, light }) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const navPath = useSelector(sta => sta.navPath["nav"]);
  const pathname = location.pathname;
  const classes = styles({ light });
  const routes = route.slice(0, -1);
  let newNavPath = {};
  let upath = "", linkmadeup = "";
  let currentLink = "";
  route.map((el) => {
    linkmadeup += `/${el}`;
    upath += el;
    currentLink = upath;
    newNavPath[upath] = { "path": linkmadeup, "state": {} };
    upath += "-";
  });
  let updatedNav = {};
  for (const npk in newNavPath) {
    if (navPath.hasOwnProperty(npk)) {
      updatedNav[npk] = navPath[npk];
    } else {
      updatedNav[npk] = { ...newNavPath[npk], state: history.location.state || {} };
    }
  }
  const currentState = updatedNav[currentLink].state;
  if (Object.keys(currentState).length) {
    title = title + " : " + currentState.name;
  }
  useEffect(() => {
    dispatch(setNavPath({ nav: updatedNav, curr: currentState }));
  }, [pathname]);
  upath = "";

  return (
    <SuiBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs className={classes.breadcrumbs}>
        <Link to="/">
          <SuiTypography
            component="span"
            variant="body2"
            textColor={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            customClass="line-height-0"
          >
            <Icon>{icon}</Icon>
          </SuiTypography>
        </Link>
        {
          routes.map((el) => {
            upath += el;
            const { path, state } = updatedNav[upath];
            upath += "-";
            return (<a onClick={() => {
              history.push({
                pathname: path,
                state
              });
            }} key={el} style={{ cursor: "pointer" }} className="decoration-none">
              <SuiTypography
                component="span"
                variant="button"
                fontWeight="regular"
                textTransform="capitalize"
                textColor={light ? "white" : "dark"}
                opacity={light ? 0.8 : 0.5}
                customClass="line-height-0"
              >
                {el}
              </SuiTypography>
            </a>);

          })
        }
        <SuiTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          textColor={light ? "white" : "dark"}
          customClass="line-height-0"
        >
          {title}
        </SuiTypography>
      </MuiBreadcrumbs>
      <SuiTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        textColor={light ? "white" : "dark"}
        noWrap
      >
        {title}
      </SuiTypography>
    </SuiBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
