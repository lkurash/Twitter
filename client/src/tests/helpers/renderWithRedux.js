import { render } from "@testing-library/react";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

import { store } from "../../redux/store";

export const renderWithRedux = (components) => {
  return render(
    <Provider store={store}>
      <CookiesProvider>{components}</CookiesProvider>
    </Provider>
  );
};
