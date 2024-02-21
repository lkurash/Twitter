import { screen } from "@testing-library/react";
import Tweets from "../../components/Tweets/Tweets";
import { renderWithRedux } from "../helpers/renderWithRedux";

jest.mock("../../components/Tweets/Tweet/Tweet", () => () => (
  <div data-testid="mocked-tweet">Mocked Child Component</div>
));

jest.mock("../../components/buttons/ShowMoreTweetsButton", () => () => (
  <div data-testid="mocked-button-showmore">Mocked Child Component</div>
));

describe("TweetsForYou component", () => {
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
    {
      id: 3,
      img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
      retweet: false,
      text: "",
      tweetId: null,
      tweetUserId: null,
      tweet_createDate: "21 Jan. 2024",
      userId: 1,
    },
    {
      id: 4,
      img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
      retweet: false,
      text: "",
      tweetId: null,
      tweetUserId: null,
      tweet_createDate: "21 Jan. 2024",
      userId: 1,
    },
    {
      id: 5,
      img: ["855d7593-fdea-4df7-afd7-c478268c7c16.jpg"],
      retweet: false,
      text: "",
      tweetId: null,
      tweetUserId: null,
      tweet_createDate: "21 Jan. 2024",
      userId: 1,
    },
  ];

  test("should render Tweets component with mocked tweets", () => {
    renderWithRedux(<Tweets tweets={tweets} />);

    const tweet = screen.getAllByTestId("mocked-tweet");
    expect(tweet.length).toBe(5);
  });

  test("should render Tweets component when tweets is []", () => {
    renderWithRedux(<Tweets tweets={[]} message={"No tweets yet."} />);

    expect(screen.queryByTestId("mocked-tweet")).toBeNull();

    const message = screen.getByTestId("message-empty-tweets");
    expect(message).toBeInTheDocument();

    const text = screen.getByText("No tweets yet.");
    expect(text).toBeInTheDocument();
  });

  test("should render Tweets component visabile button show more", () => {
    renderWithRedux(<Tweets tweets={tweets} moreTweets={true}/>);

    const button = screen.getByTestId("mocked-button-showmore");
    expect(button).toBeInTheDocument();
  });
});
