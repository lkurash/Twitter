import { render, screen } from "@testing-library/react";
import TweetActions from "../../../components/Tweets/Tweet/TweetActions";

jest.mock("../../../components/buttons/BookmarkButton", () => () => (
  <div data-testid="bookmark-button"></div>
));

jest.mock("../../../components/buttons/LikeTweetButton", () => () => (
  <div data-testid="like-button"></div>
));

jest.mock("../../../components/buttons/RepliesButton", () => () => (
  <div data-testid="replies-button"></div>
));

jest.mock("../../../components/buttons/RetweetTweetButton", () => () => (
  <div data-testid="retweet-button"></div>
));

describe("TweetActions component", () => {
  const tweet = {
    text: "Tweet text",
    img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
  };

  const retweet = false;

  test("visible tweet actions", () => {
    render(<TweetActions tweet={tweet} retweet={retweet} />);
    
    const tweetAction = screen.getByTestId("tweet-action");
    expect(tweetAction).toBeInTheDocument();

    const bookmarkButton = screen.getByTestId("bookmark-button");
    expect(bookmarkButton).toBeInTheDocument();

    const likeButton = screen.getByTestId("like-button");
    expect(likeButton).toBeInTheDocument();

    const repliesButton = screen.getByTestId("replies-button");
    expect(repliesButton).toBeInTheDocument();

    const retweetButton = screen.getByTestId("retweet-button");
    expect(retweetButton).toBeInTheDocument();
  });
});
