import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";
import { renderApp } from "../../helpers/renderApp";

describe("Render public pages", () => {
  test("render public home page", () => {
    renderApp();

    const homePage = screen.getByTestId("public-home-page");
    expect(homePage).toBeInTheDocument();

    const logo = screen.getByTestId("logo-web");
    expect(logo).toBeInTheDocument();

    const buttonExplore = screen.getByTestId("nav-explore-page");
    expect(buttonExplore).toBeInTheDocument();
  });

  test("should render public explore page when clicked on the button 'Explore'", () => {
    renderApp();

    const buttonExplore = screen.getByTestId("nav-explore-page");
    expect(buttonExplore).toBeInTheDocument();

    act(() => {
      userEvent.click(buttonExplore);
    });

    const explorePage = screen.getByTestId("explore-page");
    expect(explorePage).toBeInTheDocument();
  });

  test("return from Explore page on Public home page when clicked on the button 'Logo'", () => {
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

  test("should render login page when login button is clicked", () => {
    renderApp();

    const buttonLogin = screen.getByTestId("footer-login-button");
    expect(buttonLogin).toBeInTheDocument();

    act(() => {
      userEvent.click(buttonLogin);
    });

    const loginPage = screen.getByTestId("login-page");
    expect(loginPage).toBeInTheDocument();
  });

  test("should render signup page when signUp button is clicked", () => {
    renderApp();

    const buttonSignUp = screen.getByTestId("footer-signup-button");
    expect(buttonSignUp).toBeInTheDocument();

    act(() => {
      userEvent.click(buttonSignUp);
    });

    const signUpPage = screen.getByTestId("signup-page");
    expect(signUpPage).toBeInTheDocument();
  });
});
