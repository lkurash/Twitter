import { observer } from "mobx-react-lite";

import TweetForm from "../forms/TweetForm";

import close from "../Imgs/x_icon.png";

const PopUpWriteTweet = observer(
  ({ tweetFormVisible, setTweetFormVisible }) => {
    return (
      <div className="tweet-page">
        <div className="tweet-page-form wrapper-border">
          <div
            className="button-close"
            onClick={() => setTweetFormVisible(false)}
          >
            <img src={close} alt="close-icon" className="close-icon" />
          </div>
          <div className="tweet-page-tweet-form">
            <TweetForm
              setTweetFormVisible={setTweetFormVisible}
              tweetFormVisible={tweetFormVisible}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default PopUpWriteTweet;
