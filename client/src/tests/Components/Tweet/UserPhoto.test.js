import { fireEvent, render, screen } from "@testing-library/react";
import UserPhoto from "../../../components/Tweets/Tweet/UserPhoto";
import { useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";

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

  test("display user photo visible", () => {
    useStateSpy.mockReturnValueOnce([showProfileUser, setShowProfileUser]);
    useSelector.mockReturnValueOnce({
      isAuth: true,
    });

    render(<UserPhoto user={user} />);

    const userPhoto = screen.getByTestId("user-photo");
    expect(userPhoto).toBeInTheDocument();
  });

  test("navigate to user page if user is authenticated", () => {
    useStateSpy.mockReturnValueOnce([showProfileUser, setShowProfileUser]);
    useSelector.mockReturnValueOnce({
      isAuth: true,
    });

    useNavigate.mockReturnValueOnce(() => {});

    render(<UserPhoto user={user} />);

    const userPhoto = screen.getByTestId("user-photo");
    fireEvent.click(userPhoto);

    expect(useNavigate).toBeCalledTimes(1);
  });

  test("navigate to user page if user isn't authenticated", () => {
    useStateSpy.mockReturnValueOnce([showProfileUser, setShowProfileUser]);
    useSelector.mockReturnValueOnce({
      isAuth: false,
    });

    useNavigate.mockReturnValueOnce(() => {});

    render(<UserPhoto user={user} />);

    const userPhoto = screen.getByTestId("user-photo");
    fireEvent.click(userPhoto);

    expect(useNavigate).toBeCalledTimes(1);
  });

  test("when mouse enters user's photo, display user preview", () => {
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

  test("when mouse leaves user's photo, display user preview not visabile", () => {
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
