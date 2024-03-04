import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import CommentForm from "../../../components/forms/CommentForm";
import UserName from "../../../components/Tweets/Tweet/UserName";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

jest.mock("../../../utils/getAuthUserID", () => jest.fn(() => 1));
jest.mock("../../../utils/getUserPhoto", () => jest.fn(() => "userPhoto"));

jest.mock("../../../components/buttons/EmojiButton", () => () => (
  <div>EmojiButton</div>
));

jest.mock("../../../components/Imgs/x_icon.png", () => () => <div>close</div>);

describe("CommentForm", () => {
  let useStateSpy = jest.spyOn(React, "useState");

  const dispatch = jest.fn();
  const profile = { id: 1, username: "testUser" };
  const repliesStore = {
    activeRepliesOnTweet: 1,
    setActiveRepliesOnTweet: jest.fn(),
  };
  const infoMessageStore = {
    infoMessageStore: "",
    setInfoMessageVisible: jest.fn(),
    setTextMessage: jest.fn(),
  };
  const tweet = [
    {
      id: 1,
      img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
      retweet: false,
      text: "",
      tweetId: null,
      tweetUserId: null,
      tweet_createDate: "21 Jan. 2024",
      userId: 1,
    },
  ];
  beforeEach(() => {
    useStateSpy.mockReturnValueOnce([true, jest.fn()]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders CommentForm component", () => {
    useDispatch.mockReturnValue();
    useSelector.mockReturnValueOnce({ profile: profile });
    useSelector.mockReturnValueOnce({ profile: profile });
    useContext
      .mockReturnValueOnce({ repliesStore })
      .mockReturnValueOnce({ infoMessageStore });
    useStateSpy.mockReturnValueOnce(["", jest.fn()]);

    const { debug } = render(<CommentForm tweet={tweet} />);
    debug();
  });
});
