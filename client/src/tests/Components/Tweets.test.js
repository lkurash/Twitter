import { screen } from "@testing-library/react";
import Tweets from "../../components/Tweets/Tweets";
import { renderWithRedux } from "../helpers/renderWithRedux";
import { mockedComponent } from "../helpers/mockComponent";

jest.mock(
  "../../components/Tweets/Tweet/Tweet",
  () => () => mockedComponent("Tweet")
);

jest.mock(
  "../../components/buttons/ShowMoreTweetsButton",
  () => () => mockedComponent("ShowMoreTweetsButton")
);

describe("TweetsForYou", () => {
  const tweets = [
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
    {
      id: 2,
      img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
      retweet: false,
      text: "",
      tweetId: null,
      tweetUserId: null,
      tweet_createDate: "21 Jan. 2024",
      userId: 1,
    },
  ];

  test("displaying tweets", () => {
    renderWithRedux(<Tweets tweets={tweets} />);

    const tweet = screen.getAllByTestId("mocked-tweet");
    expect(tweet.length).toBe(2);
  });

  describe("when additional tweets to display", () => {
    test("displays more tweets button", () => {
      renderWithRedux(<Tweets tweets={tweets} moreTweets={true} />);

      const button = screen.getByTestId("mocked-showMoreTweetsButton");
      expect(button).toBeInTheDocument();
    });
  });

  describe("when no additional tweets to display", () => {
    test("doesn't displays more tweets button", () => {
      renderWithRedux(<Tweets tweets={tweets} moreTweets={false} />);

      const button = screen.queryByTestId("mocked-showMoreTweetsButton");
      expect(button).toBeNull();
    });
  });

  describe("when no tweets", () => {
    test("displaying a message about the absence of a tweet.", () => {
      renderWithRedux(<Tweets tweets={[]} message={"No tweets yet."} />);

      expect(screen.queryByTestId("mocked-tweet")).toBeNull();

      const message = screen.getByTestId("message-empty-tweets");
      expect(message).toBeInTheDocument();
    });
  });
});
