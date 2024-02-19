import { fireEvent, render, screen } from "@testing-library/react";
import UserPhoto from "../../../components/Tweets/Tweet/UserPhoto";
import { useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import navigateClickOnUser from "../../../utils/navigateClickOnUser";

jest.mock("../../../components/common/Logo", () => () => (
  <div data-testid="mocked-logo-web">Mocked Logo</div>
));

jest.mock("../../../pages/MainSectionTrends", () => () => (
  <div data-testid="mocked-section-trends">Mocked MainSectionTrends</div>
));

jest.mock("../../../pages/MainSectionWhoToRead", () => () => (
  <div data-testid="mocked-section-whotoread">Mocked MainSectionWhoToRead</div>
));

jest.mock("../../../components/common/PreviewUserOnTweet", () => () => (
  <div data-testid="mocked-preview-userOnTweet">Mocked PreviewUserOnTweet</div>
));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("timers");

describe("UserPhoto component", () => {
  const useStateSpy = jest.spyOn(React, "useState");
  let showProfileUser = false;
  let setShowProfileUser = jest.fn();

  const user = {
    id: 1,
    user_name: "User Name",
    photo: "855d7593-fdea-4df7-afd7-c478268c7c16.jpg",
  };

  beforeEach(() => {
    useSelector.mockClear();
    useNavigate.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("user photo visible", () => {
    useStateSpy.mockReturnValueOnce([showProfileUser, setShowProfileUser]);

    useSelector.mockReturnValueOnce({
      isAuth: true,
    });

    render(<UserPhoto user={user} />);
    const userPhoto = screen.getByTestId("user-photo");
    expect(userPhoto).toBeInTheDocument();
  });

  test('"navigate to user page if isAuth true"', () => {
    useStateSpy.mockReturnValueOnce([showProfileUser, setShowProfileUser]);
    useSelector.mockReturnValueOnce({
      isAuth: true,
    });

    useNavigate.mockReturnValueOnce(() => {});

    render(<UserPhoto user={user} />);

    const userPhoto = screen.getByTestId("user-photo");

    fireEvent.click(userPhoto);

    expect(useNavigate).toBeCalledTimes(1);
    expect(navigateClickOnUser(true, 1)).toBe("/user/1");
  });

  test("navigate to user page if isAuth false", () => {
    useStateSpy.mockReturnValueOnce([showProfileUser, setShowProfileUser]);
    useSelector.mockReturnValueOnce({
      isAuth: false,
    });

    useNavigate.mockReturnValueOnce(() => {});

    render(<UserPhoto user={user} />);

    const userPhoto = screen.getByTestId("user-photo");
    fireEvent.click(userPhoto);
    expect(useNavigate).toBeCalledTimes(1);
    expect(navigateClickOnUser(false, 1)).toBe("/user/1/logout");
  });

  test("mouseEnter on userPhoto", () => {
    useStateSpy.mockReturnValueOnce([showProfileUser, setShowProfileUser]);

    useSelector.mockReturnValueOnce({
      isAuth: true,
    });

    render(<UserPhoto user={user} />);

    const userPhoto = screen.getByTestId("user-photo");
    expect(userPhoto).toBeInTheDocument();

    fireEvent.mouseEnter(userPhoto);

    jest.advanceTimersByTime(500);
    expect(setShowProfileUser).toHaveBeenCalledTimes(1);
    expect(setShowProfileUser).toHaveBeenCalledWith(true);
  });

  test("mouseLeave on userPhoto", () => {
    useStateSpy.mockReturnValueOnce([showProfileUser, setShowProfileUser]);

    useSelector.mockReturnValueOnce({
      isAuth: true,
    });

    render(<UserPhoto user={user} />);

    const userPhoto = screen.getByTestId("user-photo");
    expect(userPhoto).toBeInTheDocument();

    fireEvent.mouseLeave(userPhoto);

    jest.advanceTimersByTime(500);
    expect(setShowProfileUser).toHaveBeenCalledTimes(1);
    expect(setShowProfileUser).toHaveBeenCalledWith(false);
  });
});
