import { render, screen } from "@testing-library/react";
import TweetDesc from "../../../components/Tweets/Tweet/TweetDesc";

describe("TweetDesc component", () => {
  const tweetWithOneImg = {
    text: "Tweet text",
    img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
  };

  const tweetWithFourImg = {
    text: "Tweet text",
    img: [
      "855d7593-fdea-4df7-afd7-c478268c7c16.jpg",
      "855d7593-fdea-4df7-afd7-c478268c7c17.jpg",
      "855d7593-fdea-4df7-afd7-c478268c7c18.jpg",
      "855d7593-fdea-4df7-afd7-c478268c7c19.jpg",
    ],
  };

  test("when tweet has text and one img", () => {
    render(<TweetDesc tweet={tweetWithOneImg} />);

    const tweetDesc = screen.getByTestId("tweet-desc");
    expect(tweetDesc).toBeInTheDocument();

    const tweetText = screen.getByTestId("tweet-text");
    expect(tweetText).toBeInTheDocument();
    expect(tweetText.textContent).toBe(tweetWithOneImg.text);

    const wrapperTweetOneImg = screen.getByTestId("wrapper-tweet-one-img");
    expect(wrapperTweetOneImg).toBeInTheDocument();

    const tweetImg = screen.getByTestId("tweet-img");
    expect(tweetImg).toBeInTheDocument();
  });

  test("tweet with four img", () => {
    render(<TweetDesc tweet={tweetWithFourImg} />);

    const wrapperTweetFourImg = screen.getByTestId("wrapper-four-imgs");
    expect(wrapperTweetFourImg).toBeInTheDocument();

    const tweetImg = screen.getAllByTestId("tweet-img");
    expect(tweetImg.length).toBe(4);
  });
});
