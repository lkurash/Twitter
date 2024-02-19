import UserName from "../../../components/Tweets/Tweet/UserName";
import { useSelector } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import navigateClickOnUser from "../../../utils/navigateClickOnUser";

jest.mock("../../../components/common/Logo", () => () => (
  <div data-testid="mocked-logo-web">Mocked Child Component</div>
));

jest.mock("../../../pages/MainSectionTrends", () => () => (
  <div data-testid="mocked-section-trends">Mocked Child Component</div>
));

jest.mock("../../../pages/MainSectionWhoToRead", () => () => (
  <div data-testid="mocked-section-whotoread">Mocked Child Component</div>
));

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

  test("visabile user name and profile name", () => {
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

  test("navigate to user page if isAuth true", () => {
    useSelector.mockReturnValueOnce({
      isAuth: true,
    });
    useNavigate.mockReturnValueOnce(() => {});

    render(<UserName user={user} />);

    const userName = screen.getByTestId("tweet-user-name");
    fireEvent.click(userName);

    expect(useNavigate).toBeCalledTimes(1);
    expect(navigateClickOnUser(true, user.id)).toBe("/user/1");
  });

  test("navigate to user page if isAuth false", () => {
    useSelector.mockReturnValueOnce({
      isAuth: false,
    });
    useNavigate.mockReturnValueOnce(() => {});

    render(<UserName user={user} />);

    const userName = screen.getByTestId("tweet-user-name");

    fireEvent.click(userName);

    expect(useNavigate).toBeCalledTimes(1);
    expect(navigateClickOnUser(false, user.id)).toBe("/user/1/logout");
  });
});
