import { render, screen } from "@testing-library/react";
import React from "react";
import TweetsForYou from "../../components/Tweets/TweetsForYou";
import { useSelector } from "react-redux";

jest.mock("../../components/Tweets/Tweets", () => () => (
  <div data-testid="mocked-tweets-component">Mocked Child Component</div>
));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Visabile component TwitsForYou", () => {
  let useStateSpy = jest.spyOn(React, "useState");

  beforeEach(() => {
    useSelector.mockClear();
  });

  test("visible twits when loading status is 'PENDING'", () => {
    useStateSpy.mockReturnValueOnce([true, jest.fn()]);

    useSelector.mockReturnValueOnce({
      profile: {},
    });

    useSelector.mockReturnValueOnce({
      profile: { id: 1 },
    });

    useSelector.mockReturnValueOnce({
      tweets: [{ id: 1, text: "Hello World" }],
      loadingStatus: "PENDING",
      moreTweets: false,
    });

    render(<TweetsForYou />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  test("visible twits when loading status is 'COMPLETE'", () => {
    useStateSpy.mockReturnValueOnce([false, jest.fn()]);

    useSelector.mockReturnValueOnce({
      profile: { id: 1 },
      loadingStatus: "PENDING",
      error: false,
    });

    useSelector.mockReturnValueOnce({
      profile: { id: 1 },
      loadingStatus: "COMPLETE",
      error: false,
    });

    useSelector.mockReturnValueOnce({
      tweets: [{ id: 1, text: "Hello World" }],
      loadingStatus: "COMPLETE",
      moreTweets: false,
    });

    render(<TweetsForYou />);

    const tweetsComponent = screen.getByTestId("mocked-tweets-component");

    expect(tweetsComponent).toBeInTheDocument();
  });

  test("return empty page when loading status is 'PENDING'", () => {
    useStateSpy.mockReturnValueOnce([false, jest.fn()]);

    useSelector.mockReturnValueOnce({
      profile: {},
    });

    useSelector.mockReturnValueOnce({
      profile: { id: 1 },
      loadingStatus: "COMPLETE",
      error: false,
    });

    useSelector.mockReturnValueOnce({
      tweets: [{ id: 1, text: "Hello World" }],
      loadingStatus: "PENDING",
      moreTweets: false,
    });

    render(<TweetsForYou />);

    const tweetsComponent = screen.queryByTestId("mocked-tweets-component");

    expect(tweetsComponent).not.toBeInTheDocument();
  });
});
