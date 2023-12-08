import { useContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { Context } from "../..";
import { tweetOptionsActions } from "../../redux/tweet/tweetOptions/tweetOptions.actions";
import useOutsideClick from "../../utils/useOutsideClickFunction";

const DeleteTweetForm = ({ tweet, setDeleteTweetFormVisible }) => {
  const dispatch = useDispatch();
  const { infoMessageStore } = useContext(Context);
  const deleteTweetForm = useRef(null);

  const deleteTweet = (tweet) => {
    dispatch(tweetOptionsActions.deleteTweet(tweet.id));
    infoMessageStore.setTextMessage("Tweet has been deleted.");
    infoMessageStore.setInfoMessageVisible(true);
  };

  const onClose = () => {
    setDeleteTweetFormVisible(false);
  };

  useOutsideClick(deleteTweetForm, onClose);

  return (
    <div className="message-page-delete-tweet">
      <div
        className="message-delete-tweet wrapper-border"
        ref={deleteTweetForm}
      >
        <span className="message-delete-tweet-title">Delete post?</span>
        <p className="message-delete-tweet-text">
          This action cannot be undone and the post will be permanently removed
          from your profile, all your followers' feeds, and search results.
        </p>
        <div className="message-delete-tweet-buttons">
          <button
            type="button"
            className="message-delete-tweet-button button-delete"
            onClick={() => {
              deleteTweet(tweet);
              setDeleteTweetFormVisible(false);
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="message-delete-tweet-button button-cancel"
            onClick={() => setDeleteTweetFormVisible(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTweetForm;
