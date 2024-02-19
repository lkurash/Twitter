import { render, screen } from "@testing-library/react";
import TweetDesc from "../../../components/Tweets/Tweet/TweetDesc";

let BASE_URL = `${process.env.REACT_APP_API_SCHEMA}://${process.env.REACT_APP_API_HOST}`;
BASE_URL += process.env.REACT_APP_API_PORT
  ? `:${process.env.REACT_APP_API_PORT}`
  : "";

describe("TweetDesc component", () => {
  const tweetWithOneImg = {
    text: "Tweet text",
    img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
  };

  const tweetWithOutText = {
    text: "",
    img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
  };

  const tweetWithOutImg = {
    text: "Tweet text",
  };

  const tweetWithTwoImg = {
    text: "Tweet text",
    img: [
      "855d7593-fdea-4df7-afd7-c478268c7c16.jpg",
      "855d7593-fdea-4df7-afd7-c478268c7c17.jpg",
    ],
  };

  const tweetWithThreeImg = {
    text: "Tweet text",
    img: [
      "855d7593-fdea-4df7-afd7-c478268c7c16.jpg",
      "855d7593-fdea-4df7-afd7-c478268c7c17.jpg",
      "855d7593-fdea-4df7-afd7-c478268c7c18.jpg",
    ],
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

  test("tweet with text and img", () => {
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

  test("tweet without text", () => {
    render(<TweetDesc tweet={tweetWithOutText} />);
    const tweetDesc = screen.getByTestId("tweet-desc");
    expect(tweetDesc).toBeInTheDocument();

    const tweetText = screen.queryByTestId("tweet-text");
    expect(tweetText).toBeNull();

    const wrapperTweetOneImg = screen.getByTestId("wrapper-tweet-one-img");
    expect(wrapperTweetOneImg).toBeInTheDocument();

    const tweetImg = screen.getByTestId("tweet-img");
    expect(tweetImg).toBeInTheDocument();
  });

  test("tweet without img", () => {
    render(<TweetDesc tweet={tweetWithOutImg} />);
    const tweetDesc = screen.getByTestId("tweet-desc");
    expect(tweetDesc).toBeInTheDocument();

    const tweetText = screen.getByTestId("tweet-text");
    expect(tweetText).toBeInTheDocument();
    expect(tweetText.textContent).toBe(tweetWithOutImg.text);

    const wrapperTweetImg = screen.queryByTestId("wrapper-tweet-one-img");
    expect(wrapperTweetImg).toBeNull();

    const tweetImg = screen.queryByTestId("tweet-img");
    expect(tweetImg).toBeNull();
  });

  test("tweet with one img", () => {
    render(<TweetDesc tweet={tweetWithOneImg} />);
    const wrapperTweetOneImg = screen.getByTestId("wrapper-tweet-one-img");
    expect(wrapperTweetOneImg).toBeInTheDocument();

    const tweetImg = screen.getByTestId("tweet-img");
    expect(tweetImg).toBeInTheDocument();
  });

  test("tweet with right src img", () => {
    render(<TweetDesc tweet={tweetWithOneImg} />);

    const tweetImg = screen.getByTestId("tweet-img");
    expect(tweetImg.src).toBe(`${BASE_URL}/${tweetWithOneImg.img}`);
  });

  test("tweet with two img", () => {
    render(<TweetDesc tweet={tweetWithTwoImg} />);
    const wrapperTweetTwoImg = screen.getByTestId("wrapper-two-imgs");
    expect(wrapperTweetTwoImg).toBeInTheDocument();

    const tweetImg = screen.getAllByTestId("tweet-img");
    expect(tweetImg.length).toBe(2);
  });

  test("tweet with three img", () => {
    render(<TweetDesc tweet={tweetWithThreeImg} />);
    const wrapperTweetThreeImg = screen.getByTestId("wrapper-three-imgs");
    expect(wrapperTweetThreeImg).toBeInTheDocument();

    const tweetImg = screen.getAllByTestId("tweet-img");
    expect(tweetImg.length).toBe(3);
  });

  test("tweet with four img", () => {
    render(<TweetDesc tweet={tweetWithFourImg} />);
    const wrapperTweetFourImg = screen.getByTestId("wrapper-four-imgs");
    expect(wrapperTweetFourImg).toBeInTheDocument();

    const tweetImg = screen.getAllByTestId("tweet-img");
    expect(tweetImg.length).toBe(4);
  });
});
