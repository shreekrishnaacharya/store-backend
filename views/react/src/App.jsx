import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme";
import StoreController from "view";
import Auth from "_base/Auth";
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';

loadProgressBar();

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth>
          <StoreController key="StoreController" />
        </Auth>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
