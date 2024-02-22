import UserName from "../../../components/Tweets/Tweet/UserName";
import { useSelector } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("UserName component", () => {
  const user = {
    id: 1,
    user_name: "User Name",
  };

  beforeEach(() => {
    useSelector.mockClear();
    useNavigate.mockClear();
  });

  test("should display user name and profile name", () => {
    useSelector.mockReturnValueOnce({
      isAuth: true,
    });

    render(<UserName user={user} />);

    const userName = screen.getByTestId("tweet-user-name");
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent(user.user_name);

    const profileName = screen.getByTestId("profile-name");
    expect(profileName).toBeInTheDocument();
    expect(profileName).toHaveTextContent("@User Name");
  });

  describe("when user is authenticated", () => {
    beforeEach(() => {
      useSelector.mockReturnValueOnce({
        isAuth: true,
      });
      useNavigate.mockReturnValueOnce(() => {});
    });

    afterEach(() => {
      useSelector.mockClear();
      useNavigate.mockClear();
    });

    test("clicking on the username calls the navigation function", () => {
      render(<UserName user={user} />);

      const userName = screen.getByTestId("tweet-user-name");
      fireEvent.click(userName);

      expect(useNavigate).toBeCalledTimes(1);
    });
  });

  describe("when user is not authenticated", () => {
    beforeEach(() => {
      useSelector.mockReturnValueOnce({
        isAuth: false,
      });
      useNavigate.mockReturnValueOnce(() => {});
    });

    afterEach(() => {
      useSelector.mockClear();
      useNavigate.mockClear();
    });

    test("clicking on the username calls the navigation function", () => {
      render(<UserName user={user} />);

      const userName = screen.getByTestId("tweet-user-name");
      fireEvent.click(userName);

      expect(useNavigate).toBeCalledTimes(1);
    });
  });
});
