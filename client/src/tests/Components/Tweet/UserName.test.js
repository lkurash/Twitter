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

  test("display user name and profile name visabile", () => {
    useSelector.mockReturnValueOnce({
      isAuth: true,
    });

    render(<UserName user={user} />);

    const userName = screen.getByTestId("tweet-user-name");
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent(user.user_name);

    const profileName = screen.getByTestId("profile-name");
    expect(profileName).toBeInTheDocument();
    expect(profileName).toHaveTextContent(`@${user.user_name}`);
  });

  describe("when click on photo navigate to private user page", () => {
    test("navigate to user page if isAuth true", () => {
      useSelector.mockReturnValueOnce({
        isAuth: true,
      });
      useNavigate.mockReturnValueOnce(() => {});

      render(<UserName user={user} />);

      const userName = screen.getByTestId("tweet-user-name");
      fireEvent.click(userName);

      expect(useNavigate).toBeCalledTimes(1);
    });
  });

  describe("when click on photo navigate to user public page", () => {
    test("navigate to user page if isAuth false", () => {
      useSelector.mockReturnValueOnce({
        isAuth: false,
      });
      useNavigate.mockReturnValueOnce(() => {});

      render(<UserName user={user} />);

      const userName = screen.getByTestId("tweet-user-name");

      fireEvent.click(userName);

      expect(useNavigate).toBeCalledTimes(1);
    });
  });
});
