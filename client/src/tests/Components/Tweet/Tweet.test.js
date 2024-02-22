import { render, screen } from "@testing-library/react";
import Tweet from "../../../components/Tweets/Tweet/Tweet";
import { mockedComponents } from "../../helpers/mockComponent";

jest.mock(
  "../../../components/Tweets/Tweet/TweetActions",
  () => () => mockedComponents("TweetActions")
);

jest.mock(
  "../../../components/common/TolltipRetweetOnTweet",
  () => () => mockedComponents("TolltipRetweetOnTweet")
);

jest.mock(
  "../../../components/Tweets/Tweet/UserName",
  () => () => mockedComponents("UserName")
);

jest.mock(
  "../../../components/Tweets/Tweet/UserPhoto",
  () => () => mockedComponents("UserPhoto")
);

jest.mock(
  "../../../components/buttons/DeleteTweetButton",
  () => () => mockedComponents("DeleteTweetButton")
);

const AUTHENTICATED_USER_ID = 1;

jest.mock("../../../utils/getAuthUserID", () => () => AUTHENTICATED_USER_ID);

describe("Tweet", () => {
  const usersOwnTweet = {
    id: 1,
    img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
    retweet: false,
    text: "Hello World!",
    tweetId: null,
    tweetUserId: null,
    tweet_createDate: "21 Jan. 2024",
    userId: 1,
  };

  const someoneElsesTweet = {
    id: 2,
    img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
    retweet: false,
    text: "Hello World!",
    tweetId: null,
    tweetUserId: null,
    tweet_createDate: "21 Jan. 2024",
    userId: 2,
  };

  test("displays child components", () => {
    render(<Tweet tweet={someoneElsesTweet} retweet={false} />);

    const userName = screen.getByTestId("mocked-userName");
    expect(userName).toBeInTheDocument();

    const userPhoto = screen.getByTestId("mocked-userPhoto");
    expect(userPhoto).toBeInTheDocument();

    const dataCreatedTweet = screen.getByTestId("tweet-data-created-tweet");
    expect(dataCreatedTweet).toBeInTheDocument();

    const tweetAction = screen.getByTestId("mocked-tweetActions");
    expect(tweetAction).toBeInTheDocument();
  });

  test("displays a tooltip about retweer", () => {
    render(<Tweet tweet={someoneElsesTweet} retweet={true} />);

    const tolltipRetweet = screen.getByTestId("mocked-tolltipRetweetOnTweet");
    expect(tolltipRetweet).toBeInTheDocument();
  });

  describe("when user is the owner of the tweet", () => {
    describe("delete tweet button", () => {
      test("visible delete tweet button on tweet", () => {
        render(<Tweet tweet={usersOwnTweet} retweet={false} />);

        const deleteTweetButton = screen.getByTestId(
          "mocked-deleteTweetButton"
        );
        expect(deleteTweetButton).toBeInTheDocument();
      });
    });

    describe("when user is not the owner of the tweet", () => {
      describe("delete tweet button", () => {
        test("delete button is invisible", () => {
          render(<Tweet tweet={someoneElsesTweet} retweet={false} />);

          const deleteTweetButton = screen.queryByTestId(
            "mocked-delete-tweet-button"
          );
          expect(deleteTweetButton).toBeNull();
        });
      });
    });
  });
});
