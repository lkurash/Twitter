import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "../../redux/store";

export function renderWithRedux(
  component,
  {
    preloadedState = {},
    store = configureStore({
      reducer: appReducer,
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    store,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
}
