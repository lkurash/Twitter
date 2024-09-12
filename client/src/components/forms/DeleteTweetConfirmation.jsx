import { useRef } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { tweetOptionsActions } from "../../redux/tweet/tweetOptions/tweetOptions.actions";
import {
  setInfoMessageVisible,
  setTextMessage,
} from "../../redux/popupElements/infoMessage";

import useOutsideClick from "../../utils/useOutsideClickFunction";

const DeleteTweetConfirmation = ({
  tweet,
  setDeleteTweetFormVisible,
  deleteTweetFormVisible,
}) => {
  const dispatch = useDispatch();
  const popUp = useRef(null);
  const deleteTweetForm = useRef(null);

  const deleteTweet = (tweet) => {
    dispatch(tweetOptionsActions.deleteTweet(tweet.id));

    dispatch(setTextMessage("Tweet has been deleted."));
    dispatch(setInfoMessageVisible(true));
  };

  const onClose = () => {
    setDeleteTweetFormVisible(false);
  };

  useOutsideClick(deleteTweetForm, onClose);

  return (
    <CSSTransition
      in={deleteTweetFormVisible}
      nodeRef={popUp}
      timeout={150}
      unmountOnExit
      classNames="visible-pop-up"
      onEnter={() => setDeleteTweetFormVisible(true)}
    >
      <div className="backgraund-confirmation" ref={popUp}>
        <div
          id="confirmation"
          className="confirmation-message wrapper-border"
          ref={deleteTweetForm}
        >
          <span className="confirmation-message-title">Delete post?</span>
          <p className="confirmation-message-text">
            This action cannot be undone and the post will be permanently
            removed from your profile, all your followers' feeds, and search
            results.
          </p>
          <div className="confirmation-message-buttons">
            <button
              data-testid="confirmation-button-delete"
              type="button"
              className="confirmation-message-button button-delete"
              onClick={() => {
                deleteTweet(tweet);
                setDeleteTweetFormVisible(false);
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="confirmation-message-button button-cancel"
              onClick={() => setDeleteTweetFormVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default DeleteTweetConfirmation;
