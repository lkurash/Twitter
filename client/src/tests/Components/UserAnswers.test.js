import { render, screen } from "@testing-library/react";
import React from "react";
import { useSelector } from "react-redux";
import UserAnswers from "../../components/Tweets/UserAnswers";
import { mockedComponents } from "../helpers/mockComponent";

jest.mock(
  "../../components/Tweets/Answers",
  () => () => mockedComponents("Answers")
);

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("UserAnswers component", () => {
  let useStateSpy = jest.spyOn(React, "useState");

  beforeEach(() => {
    useSelector.mockReturnValueOnce({});
  });

  test("displays a spinner when it takes a long time to load", () => {
    useStateSpy.mockReturnValueOnce([true, jest.fn()]);
    useSelector.mockReturnValueOnce({
      tweets: [],
      loadingStatus: "PENDING",
      moreTweets: false,
    });

    render(<UserAnswers />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  test("displays tweets after loading", () => {
    useStateSpy.mockReturnValueOnce([false, jest.fn()]);
    useSelector.mockReturnValueOnce({
      tweets: [{ id: 1, text: "Hello World" }],
      loadingStatus: "COMPLETE",
      moreTweets: false,
    });

    render(<UserAnswers />);

    const tweetsComponent = screen.getByTestId("mocked-answers");

    expect(tweetsComponent).toBeInTheDocument();
  });
});
