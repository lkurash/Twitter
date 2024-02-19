import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";
import { renderApp } from "../../helpers/renderApp";

describe("Render public pages", () => {
  test("Public home page", () => {
    renderApp();

    const homePage = screen.getByTestId("public-home-page");
    expect(homePage).toBeInTheDocument();

    const logo = screen.getByTestId("logo-web");
    expect(logo).toBeInTheDocument();

    const buttonExplore = screen.getByTestId("nav-explore-page");
    expect(buttonExplore).toBeInTheDocument();
  });

  test("Explore page", () => {
    renderApp();

    const buttonExplore = screen.getByTestId("nav-explore-page");
    expect(buttonExplore).toBeInTheDocument();

    act(() => {
      userEvent.click(buttonExplore);
    });
    const explorePage = screen.getByTestId("explore-page");
    expect(explorePage).toBeInTheDocument();
  });

  test("Return from Explore page on Public home page", () => {
    renderApp("/explore");

    const explorePage = screen.getByTestId("explore-page");
    expect(explorePage).toBeInTheDocument();

    const buttonLogo = screen.getByTestId("logo-web");
    expect(buttonLogo).toBeInTheDocument();
    act(() => {
      userEvent.click(buttonLogo);
    });
    const homePageAfterClick = screen.getByTestId("public-home-page");
    expect(homePageAfterClick).toBeInTheDocument();
  });

  test("Visible Login page", () => {
    renderApp();

    const buttonLogin = screen.getByTestId("footer-login-button");
    expect(buttonLogin).toBeInTheDocument();

    act(() => {
      userEvent.click(buttonLogin);
    });
    const loginPage = screen.getByTestId("login-page");
    expect(loginPage).toBeInTheDocument();
  });

  test("Visible SignUp page", () => {
    renderApp();

    const buttonSignUp = screen.getByTestId("footer-signup-button");
    expect(buttonSignUp).toBeInTheDocument();

    act(() => {
      userEvent.click(buttonSignUp);
    });
    const signUpPage = screen.getByTestId("signup-page");
    expect(signUpPage).toBeInTheDocument();
  });

  test("Active users search input", () => {
    renderApp();
    const inputSearch = screen.getByTestId("input-search");
    expect(inputSearch).toBeInTheDocument();

    act(() => {
      userEvent.click(inputSearch);
    });
    const activeInput = screen.getByTestId("active-search-input");
    expect(activeInput).toBeInTheDocument();

    act(() => {
      fireEvent.input(inputSearch, { target: { value: "test" } });
    });
    expect(inputSearch.value).toBe("test");
  });
});
