import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import App from "App";
import store from "./redux/store";
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <SnackbarProvider maxSnack={5}>
          <App />
        </SnackbarProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
