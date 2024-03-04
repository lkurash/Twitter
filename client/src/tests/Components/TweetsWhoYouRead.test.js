import { render, screen } from "@testing-library/react";
import React from "react";
import { useSelector } from "react-redux";
import TweetsWhoYouRead from "../../components/Tweets/TweetsWhoYouReading";
import { mockedComponent } from "../helpers/mockComponent";

jest.mock(
  "../../components/Tweets/Tweets",
  () => () => mockedComponent("Tweets")
);

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("TweetsWhoYouRead", () => {
  let useStateSpy = jest.spyOn(React, "useState");

  beforeEach(() => {
    useSelector.mockReturnValueOnce({
      profile: {},
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays a spinner when it takes a long time to load", () => {
    useStateSpy.mockReturnValueOnce([true, jest.fn()]);
    useSelector.mockReturnValueOnce({
      profile: { id: 1 },
    });
    useSelector.mockReturnValueOnce({
      tweets: [],
      loadingStatus: "PENDING",
      moreTweets: false,
    });

    render(<TweetsWhoYouRead />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("displays tweets after loading", () => {
    useStateSpy.mockReturnValueOnce([false, jest.fn()]);
    useSelector.mockReturnValueOnce({
      profile: { id: 1 },
    });
    useSelector.mockReturnValueOnce({
      tweets: [{ id: 1, text: "Hello World" }],
      loadingStatus: "COMPLETE",
      moreTweets: false,
    });

    render(<TweetsWhoYouRead />);

    const tweetsComponent = screen.getByTestId("mocked-tweets");
    expect(tweetsComponent).toBeInTheDocument();
  });
});
