import { render, screen } from "@testing-library/react";
import React from "react";
import { useSelector } from "react-redux";
import UserTweetsWithLikes from "../../components/Tweets/UserTweetsWithLikes";

jest.mock("../../components/Tweets/Tweets", () => () => (
  <div data-testid="mocked-tweets-component">Mocked Child Component</div>
));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("UserTweetsWithLikes component", () => {
  let useStateSpy = jest.spyOn(React, "useState");

  beforeEach(() => {
    useSelector.mockClear();
  });

  test("visible tweets when loading status is 'PENDING' > 1000ms", () => {
    useStateSpy.mockReturnValueOnce([true, jest.fn()]);

    useSelector.mockReturnValueOnce({
      profile: {},
    });

    useSelector.mockReturnValueOnce({
      profile: { id: 1 },
    });

    useSelector.mockReturnValueOnce({
      tweets: [],
      loadingStatus: "PENDING",
      moreTweets: false,
    });

    render(<UserTweetsWithLikes />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  test("visible tweets when loading status is 'COMPLETE'", () => {
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
      loadingStatus: "COMPLETE",
      moreTweets: false,
    });

    render(<UserTweetsWithLikes />);

    const tweetsComponent = screen.getByTestId("mocked-tweets-component");

    expect(tweetsComponent).toBeInTheDocument();
  });

  test("return empty page when loading status is 'PENDING' < 1000ms", () => {
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
      tweets: [],
      loadingStatus: "PENDING",
      moreTweets: false,
    });

    render(<UserTweetsWithLikes />);

    const tweetsComponent = screen.queryByTestId("mocked-tweets-component");

    expect(tweetsComponent).not.toBeInTheDocument();
  });
});
