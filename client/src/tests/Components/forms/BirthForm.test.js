import { render } from "@testing-library/react";
import BirthForm from "../../../components/forms/BirthForm";
import React from "react";
import { setBirthDate } from "../../../redux/user/visibilityUserInfo/visibilityUserInfo";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux");

describe("BirthForm component", () => {
  let useStateSpy = jest.spyOn(React, "useState");
  let user;
  let setUserSelectDay = jest.fn();
  let setUserSelectYear = jest.fn();
  let setUserSelectMonth = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when user is not authenticated", () => {
    beforeEach(() => {
      user = null;

      useSelector.mockReturnValueOnce({
        profile: {},
      });
    });

    test("saving the user's date of birth in Redux during registration", () => {
      useStateSpy.mockReturnValueOnce(["April", setUserSelectMonth]);
      useStateSpy.mockReturnValueOnce(["20", setUserSelectDay]);
      useStateSpy.mockReturnValueOnce(["1990", setUserSelectYear]);

      render(<BirthForm user={user} />);

      expect(useDispatch(setBirthDate)).toHaveBeenCalledTimes(1);
      expect(useDispatch(setBirthDate)).toHaveBeenCalledWith({
        payload: "20 April 1990",
        type: "visibilityUserInfo/setBirthDate",
      });
    });
  });

  describe("when user is authenticated", () => {
    beforeEach(() => {
      user = { id: 1, userName: "User Name" };

      useSelector.mockReturnValueOnce({
        profile: { id: 1, user_name: "User Name", birthdate: "20 April 1990" },
      });
    });

    test("prefilled form", () => {
      useStateSpy.mockReturnValueOnce(["", setUserSelectMonth]);
      useStateSpy.mockReturnValueOnce(["", setUserSelectDay]);
      useStateSpy.mockReturnValueOnce(["", setUserSelectYear]);

      render(<BirthForm user={user} />);

      expect(setUserSelectMonth).toHaveBeenCalledWith("April");
      expect(setUserSelectDay).toHaveBeenCalledWith("20");
      expect(setUserSelectYear).toHaveBeenCalledWith("1990");
    });

    test("changing the user's date of birth in Redux when editing profile", () => {
      useStateSpy.mockReturnValueOnce(["May", setUserSelectMonth]);
      useStateSpy.mockReturnValueOnce(["25", setUserSelectDay]);
      useStateSpy.mockReturnValueOnce(["1980", setUserSelectYear]);

      render(<BirthForm user={user} />);

      expect(useDispatch(setBirthDate)).toHaveBeenCalledTimes(1);
      expect(useDispatch(setBirthDate)).toHaveBeenCalledWith({
        payload: "25 May 1980",
        type: "visibilityUserInfo/setBirthDate",
      });
    });
  });
});
