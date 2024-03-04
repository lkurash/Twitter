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

describe("UserPhoto", () => {
  const useStateSpy = jest.spyOn(React, "useState");
  let showProfileUser = false;
  let setShowProfileUser = jest.fn();

  const user = {
    id: 1,
    user_name: "User Name",
    photo: "855d7593-fdea-4df7-afd7-c478268c7c16.jpg",
  };

  beforeEach(() => {
    useStateSpy.mockReturnValueOnce([showProfileUser, setShowProfileUser]);
    useSelector.mockReturnValueOnce({
      isAuth: {},
    });
    useNavigate.mockReturnValueOnce(() => {});
    jest.useFakeTimers();
  });

  afterEach(() => {
    useSelector.mockClear();
    useNavigate.mockClear();
    jest.clearAllTimers();
  });

  test("displays user photo", () => {
    render(<UserPhoto user={user} />);

    const userPhoto = screen.getByTestId("user-photo");
    expect(userPhoto).toBeInTheDocument();
  });

  describe("when user is authenticated", () => {
    beforeEach(() => {
      useSelector.mockReturnValueOnce({
        isAuth: true,
      });
    });

    afterEach(() => {
      useSelector.mockClear();
    });

    describe("when clicking on the user photo", () => {
      test("calls the navigation function", () => {
        render(<UserPhoto user={user} />);

        const userPhoto = screen.getByTestId("user-photo");
        fireEvent.click(userPhoto);

        expect(useNavigate).toBeCalledTimes(1);
      });
    });
  });

  describe("when user is not authenticated", () => {
    beforeEach(() => {
      useSelector.mockReturnValueOnce({
        isAuth: false,
      });
    });

    afterEach(() => {
      useSelector.mockClear();
    });

    describe("when clicking on the user photo", () => {
      test("calls the navigation function", () => {
        render(<UserPhoto user={user} />);

        const userPhoto = screen.getByTestId("user-photo");
        fireEvent.click(userPhoto);

        expect(useNavigate).toBeCalledTimes(1);
      });
    });
  });

  describe("user profile preview popup", () => {
    test("displays user preview", () => {
      render(<UserPhoto user={user} />);

      const userPhoto = screen.getByTestId("user-photo");
      expect(userPhoto).toBeInTheDocument();
      fireEvent.mouseEnter(userPhoto);

      jest.advanceTimersByTime(500);

      expect(setShowProfileUser).toHaveBeenCalledTimes(1);
      expect(setShowProfileUser).toHaveBeenCalledWith(true);
    });

    test("doesn't show user preview", () => {
      render(<UserPhoto user={user} />);

      const userPhoto = screen.getByTestId("user-photo");
      expect(userPhoto).toBeInTheDocument();
      fireEvent.mouseLeave(userPhoto);

      jest.advanceTimersByTime(500);

      expect(setShowProfileUser).toHaveBeenCalledTimes(1);
      expect(setShowProfileUser).toHaveBeenCalledWith(false);
    });
  });
});
