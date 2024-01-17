import { useState } from "react";

import PopUpWriteTweet from "../common/PopUpWriteTweet";

import tweetIcon from "../Imgs/feather_icon.png";

const WriteTweetButton = () => {
  const [tweetFormVisible, setTweetFormVisible] = useState(false);
  return (
    <>
      <button
        type="button"
        className="button-tweet"
        onClick={() => setTweetFormVisible(true)}
      >
        <span>Tweet</span>
        <img src={tweetIcon} alt="Tweet" className="tweet-icon" />
      </button>
      <PopUpWriteTweet
        tweetFormVisible={tweetFormVisible}
        setTweetFormVisible={setTweetFormVisible}
      />
    </>
  );
};
export default WriteTweetButton;
