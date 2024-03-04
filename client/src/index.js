import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import AppRouter from "./AppRouter";

import { store } from "./redux/store";

import reportWebVitals from "./reportWebVitals";

import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <CookiesProvider>
      <AppRouter />
    </CookiesProvider>
  </Provider>
);

reportWebVitals();
