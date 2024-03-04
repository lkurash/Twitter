import { useSelector } from "react-redux";
import React from "react";
import { render, screen } from "@testing-library/react";
import BirthForm from "../../../components/forms/BirthForm";


jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("react", () => ({
  useContext: jest.fn(),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe("BirthForm component", () => {
  let useStateSpy = jest.spyOn(React, "useState");

  let userSelectMonth = "";
  let setUserSelectMonth = jest.fn();

  let userSelectDay = "";
  let setUserSelectDay = jest.fn();

  let userSelectYear = "";
  let setUserSelectYear = jest.fn();

  let user = { id: 1 };

  // beforeEach(() => {
  //   useContext.mockClear();
  //   useState.mockClear();
  //   useSelector.mockClear();
  // });

  test("displays", () => {
    useSelector.mockReturnValueOnce({ profile: {} });

    useStateSpy.mockReturnValueOnce([userSelectMonth, setUserSelectMonth]);
    useStateSpy.mockReturnValueOnce([userSelectDay, setUserSelectDay]);
    useStateSpy.mockReturnValueOnce([userSelectYear, setUserSelectYear]);

    render(<BirthForm user={user} />);
  });
});
