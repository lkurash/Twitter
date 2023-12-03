import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import getUserPhoto from "../../utils/getUserPhoto";
import EmojiButton from "../buttons/EmojiButton";

import imgFile from "../Imgs/file.png";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../redux/user/user.selectors";
import { tweetOptionsActions } from "../../redux/tweet/tweetOptions/tweetOptions.actions";
import ImgsInTweetForm from "./ImgsInTweetForm";

const TweetForm = observer(({ tweetFormVisible, setTweetFormVisible }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfile);
  const { infoMessageStore } = useContext(Context);
  const [imgs, setImgs] = useState([]);
  const [changesImgsList, setChangesImgsList] = useState(false);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSelectedImgFile = (e) => {
    let arr = [];
    if (e.target.files.length > 4) {
      infoMessageStore.setTextMessage("Select up to 4 photos.");
      infoMessageStore.setInfoMessageVisible(true);
    } else {
      for (let index = 0; index < e.target.files.length; index++) {
        arr.push(e.target.files[index]);
        setImgs(arr);
      }
      setChangesImgsList(true);
    }
  };

  const formData = () => {
    const formData = new FormData();
    if (imgs.length > 0 || text.length > 0) {
      formData.append("text", text);
      imgs.forEach((img) => {
        formData.append("imgs", img);
      });
    }
    return formData;
  };

  const createTweets = () => {
    setIsLoading(true);

    setTimeout(() => {
      dispatch(tweetOptionsActions.createTweet(formData()));
      setIsLoading(false);
      infoMessageStore.setTextMessage("Tweet has been sent.");
      infoMessageStore.setInfoMessageVisible(true);
    }, 1000);

    setText("");
    setImgs([]);
  };

  if (text.length > 255) {
    return setText(text.slice(0, 254));
  }

  const addEmojiInTweetText = (event) => {
    setText(text + event.emoji);
  };

  return (
    <>
      <div className="loading-tweet">
        {isLoading && <div className="loading-line" />}
      </div>
      <div className="tweet-fotrm-block">
        <form className="tweet-form">
          <div className="user-info">
            <div className="user-info-photo">
              <img alt="User" src={getUserPhoto(profile)} />
            </div>
          </div>
          <div className="tweet-form-input">
            <textarea
              name="tweetInputForm"
              value={text}
              autoFocus={tweetFormVisible}
              className="tweet-input-text"
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
            />
          </div>
        </form>
        <ImgsInTweetForm
          imgs={imgs}
          setImgs={setImgs}
          changesImgsList={changesImgsList}
          setChangesImgsList={setChangesImgsList}
        />
        <div className="tweet-panel">
          <div className="tweet-panel-img">
            <input
              type="file"
              multiple
              accept=".jpg, .jpeg, .png"
              id="input-file"
              onChange={(e) => {
                getSelectedImgFile(e);
              }}
            />
            <label htmlFor="input-file" className="tweet-form-input-file">
              <img src={imgFile} alt="File" />
            </label>
            <EmojiButton addEmojiInTweetText={addEmojiInTweetText} />
          </div>
          <button
            className="tweet-panel-button-tweet"
            type="button"
            onClick={() => {
              if (tweetFormVisible) {
                setTweetFormVisible(false);
              }
              createTweets();
            }}
          >
            <span>Tweet</span>
          </button>
        </div>
      </div>
    </>
  );
});

export default TweetForm;
