import { render, screen } from "@testing-library/react";
import React from "react";
import { useSelector } from "react-redux";
import UserAnswers from "../../components/Tweets/UserAnswers";

jest.mock("../../components/Tweets/Answers", () => () => (
  <div data-testid="mocked-answers-component">Mocked Child Component</div>
));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("UserAnswers component", () => {
  let useStateSpy = jest.spyOn(React, "useState");

  beforeEach(() => {
    useSelector.mockClear();
  });

  test("visible tweets when loading status is 'PENDING' > 1000ms", () => {
    useStateSpy.mockReturnValueOnce([true, jest.fn()]);
    useSelector.mockReturnValueOnce({});
    useSelector.mockReturnValueOnce({
      tweets: [],
      loadingStatus: "PENDING",
      moreTweets: false,
    });

    render(<UserAnswers />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  test("visible tweets when loading status is 'COMPLETE'", () => {
    useStateSpy.mockReturnValueOnce([false, jest.fn()]);
    useSelector.mockReturnValueOnce({});
    useSelector.mockReturnValueOnce({
      tweets: [{ id: 1, text: "Hello World" }],
      loadingStatus: "COMPLETE",
      moreTweets: false,
    });

    render(<UserAnswers />);

    const tweetsComponent = screen.getByTestId("mocked-answers-component");

    expect(tweetsComponent).toBeInTheDocument();
  });

  test("return empty page when loading status is 'PENDING' < 1000ms", () => {
    useStateSpy.mockReturnValueOnce([false, jest.fn()]);
    useSelector.mockReturnValueOnce({});
    useSelector.mockReturnValueOnce({
      tweets: [],
      loadingStatus: "PENDING",
      moreTweets: false,
    });

    render(<UserAnswers />);

    const tweetsComponent = screen.queryByTestId("mocked-answers-component");

    expect(tweetsComponent).not.toBeInTheDocument();
  });
});
