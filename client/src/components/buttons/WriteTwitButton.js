import { useState } from "react";

import PopUpWriteTwit from "../PopUpWriteTwit";

import tweetIcon from "../Imgs/feather_icon.png";

const WriteTwitButton = () => {
  const [twitFormVisible, setTwitFormVisible] = useState(false);
  return (
    <>
      <button
        type="button"
        className="button-twit"
        onClick={() => setTwitFormVisible(true)}
      >
        <span>Tweet</span>
        <img src={tweetIcon} alt="Tweet" className="tweet-icon" />
      </button>
      {twitFormVisible && (
        <PopUpWriteTwit
          twitFormVisible={twitFormVisible}
          setTwitFormVisible={setTwitFormVisible}
        />
      )}
    </>
  );
};
export default WriteTwitButton;
