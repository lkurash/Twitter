import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

import { observer } from "mobx-react-lite";

import TweetForm from "../forms/TweetForm";

import close from "../Imgs/x_icon.png";

const PopUpWriteTweet = observer(
  ({ tweetFormVisible, setTweetFormVisible }) => {
    const popUp = useRef(null);

    return (
      <CSSTransition
        in={tweetFormVisible}
        nodeRef={popUp}
        timeout={150}
        unmountOnExit
        classNames="visible-pop-up"
        onEnter={() => setTweetFormVisible(true)}
      >
        <div className="background" ref={popUp}>
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
      </CSSTransition>
    );
  }
);

export default PopUpWriteTweet;
