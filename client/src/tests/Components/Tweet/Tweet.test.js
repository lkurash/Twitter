import { render, screen } from "@testing-library/react";
import Tweet from "../../../components/Tweets/Tweet/Tweet";

jest.mock("../../../components/Tweets/Tweet/TweetActions", () => () => (
  <div data-testid="mocked-tweet-action">Mocked TweetActions </div>
));

jest.mock("../../../components/common/TolltipRetweetOnTweet", () => () => (
  <div data-testid="mocked-tolltip-retweet-tweet">
    Mocked TooltipRetweetOnTweet
  </div>
));

jest.mock("../../../components/Tweets/Tweet/UserName", () => () => (
  <div data-testid="mocked-user-name">Mocked UserName</div>
));

jest.mock("../../../components/Tweets/Tweet/UserPhoto", () => () => (
  <div data-testid="mocked-user-photo">Mocked UserPhoto</div>
));

jest.mock("../../../components/buttons/DeleteTweetButton", () => () => (
  <div data-testid="mocked-delete-tweet-button">Mocked UserPhoto</div>
));

jest.mock("../../../utils/getAuthUserID", () => () => 1);

describe("Tweet", () => {
  const tweetData = {
    id: 1,
    img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
    retweet: false,
    text: "Hello World!",
    tweetId: null,
    tweetUserId: null,
    tweet_createDate: "21 Jan. 2024",
    userId: 1,
  };

  test("visible tweet", () => {
    render(<Tweet tweet={tweetData} retweet={false} />);
    const tweet = screen.getByTestId("tweet");
    expect(tweet).toBeInTheDocument();

    const userName = screen.getByTestId("mocked-user-name");
    expect(userName).toBeInTheDocument();

    const userPhoto = screen.getByTestId("mocked-user-photo");
    expect(userPhoto).toBeInTheDocument();

    const dataCreatedTweet = screen.getByTestId("tweet-data-created-tweet");
    expect(dataCreatedTweet).toBeInTheDocument();

    const tweetAction = screen.getByTestId("mocked-tweet-action");
    expect(tweetAction).toBeInTheDocument();
  });

  test("visabile tolltip retweet", () => {
    render(<Tweet tweet={tweetData} retweet={true} />);

    const tweet = screen.getByTestId("tweet");
    expect(tweet).toBeInTheDocument();

    const tolltipRetweet = screen.getByTestId("mocked-tolltip-retweet-tweet");
    expect(tolltipRetweet).toBeInTheDocument();
  });

  test("visible delete tweet button on tweet", () => {
    const userInfo = { id: 1 };

    render(<Tweet tweet={tweetData} userInfo={userInfo} retweet={false} />);
    const deleteTweetButton = screen.getByTestId("mocked-delete-tweet-button");
    expect(deleteTweetButton).toBeInTheDocument();
  });

  test("visible tweet text", () => {
    render(<Tweet tweet={tweetData} retweet={false} />);
    const tweetDesc = screen.getByText("Hello World!");
    expect(tweetDesc).toBeInTheDocument();
  });

  test("visible tweet image", () => {
    render(<Tweet tweet={tweetData} retweet={false} />);
    const tweetImg = screen.getByTestId("tweet-img");
    expect(tweetImg).toBeInTheDocument();
  });
});
