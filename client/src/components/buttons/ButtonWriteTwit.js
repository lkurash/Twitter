import { useState } from "react";
import tweetIcon from "../Img/feather_icon.png";
import PopUpWriteTwit from "../PopUpWriteTwit";

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
      <PopUpWriteTwit
        showTwitForm={showTwitForm}
        setShowTwitForm={setShowTwitForm}
      />
    </>
  );
};
export default ButtonWriteTwit;