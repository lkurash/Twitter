import { useState } from "react";
import tweetIcon from "./Img/feather_icon.png";
import TwitPageComponent from "./TwitPageComponent";

const ButtonWriteTwit = () => {
  const [showTwitForm, setShowTwitForm] = useState(false);
  return (
    <>
      <button
        type="button"
        className="button-twit"
        onClick={() => setShowTwitForm(true)}
      >
        <span>Tweet</span>
        <img src={tweetIcon} alt="Tweet" className="tweet-icon" />
      </button>
      <TwitPageComponent
        showTwitForm={showTwitForm}
        setShowTwitForm={setShowTwitForm}
      />
    </>
  );
};
export default ButtonWriteTwit;
