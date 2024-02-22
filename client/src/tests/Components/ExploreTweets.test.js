import { render, screen } from "@testing-library/react";
import React from "react";
import { useSelector } from "react-redux";
import ExploreTweets from "../../components/Tweets/ExploreTweets";
import { mockedComponents } from "../helpers/mockComponent";

jest.mock(
  "../../components/Tweets/Tweets",
  () => () => mockedComponents("Tweets")
);

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("ExploreTweets component", () => {
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

    render(<ExploreTweets />);

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

    render(<ExploreTweets />);

    const tweetsComponent = screen.getByTestId("mocked-tweets");

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

    render(<ExploreTweets />);

    const tweetsComponent = screen.queryByTestId("mocked-tweets-component");

    expect(tweetsComponent).not.toBeInTheDocument();
  });
});
