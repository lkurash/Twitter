import { render, screen } from "@testing-library/react";
import TweetDesc from "../../../components/Tweets/Tweet/TweetDesc";

describe("TweetDesc", () => {
  const tweetWithText = {
    text: "Tweet text",
  };

  const tweetWithOneImages = {
    img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
  };

  const tweetWithFourImages = {
    img: [
      "855d7593-fdea-4df7-afd7-c478268c7c16.jpg",
      "855d7593-fdea-4df7-afd7-c478268c7c17.jpg",
      "855d7593-fdea-4df7-afd7-c478268c7c18.jpg",
      "855d7593-fdea-4df7-afd7-c478268c7c19.jpg",
    ],
  };

  test("displays tweet with text", () => {
    render(<TweetDesc tweet={tweetWithText} />);

    const tweetDesc = screen.getByTestId("tweet-desc");
    expect(tweetDesc).toBeInTheDocument();

    const tweetText = screen.getByTestId("tweet-text");
    expect(tweetText).toBeInTheDocument();
    expect(tweetText.textContent).toBe(tweetWithText.text);
  });

  test("displays tweet with one img", () => {
    render(<TweetDesc tweet={tweetWithOneImages} />);

    const wrapperTweetOneImg = screen.getByTestId("wrapper-tweet-one-img");
    expect(wrapperTweetOneImg).toBeInTheDocument();

    const tweetImg = screen.getByTestId("tweet-img");
    expect(tweetImg).toBeInTheDocument();
  });

  test("displays tweet with four img", () => {
    render(<TweetDesc tweet={tweetWithFourImages} />);

    const wrapperTweetFourImg = screen.getByTestId("wrapper-four-imgs");
    expect(wrapperTweetFourImg).toBeInTheDocument();

    const tweetImg = screen.getAllByTestId("tweet-img");
    expect(tweetImg.length).toBe(4);
  });
});
