import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";

import getUserPhoto from "../../utils/getUserPhoto";
import EmojiButton from "../buttons/EmojiButton";

import imgFile from "../Imgs/file.png";
import close from "../Imgs/x_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../redux/user/user.selectors";
import { tweetOptionsActions } from "../../redux/tweetOptions/tweetOptions.actions";

const TwitForm = observer(({ twitFormVisible, setTwitFormVisible }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfile);
  const { infoMessageStore } = useContext(Context);
  const [text, setText] = useState("");
  const [imgs, setImgs] = useState([]);
  const [changesImgsList, setChangesImgsList] = useState(false);

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

  const deleteSelectedImg = (img) => {
    setChangesImgsList(true);
    imgs.splice(img, 1);
    setImgs(imgs);
    document.getElementById("input-file").value = "";
  };

  const getClassName = (imgs) => {
    if (imgs.length === 1) {
      return "wrapper-twit-one-img";
    }

    if (imgs.length === 2) {
      return "wrapper-two-imgs";
    }

    if (imgs.length === 3) {
      return "wrapper-three-imgs";
    }

    if (imgs.length === 4) {
      return "wrapper-four-imgs";
    }
  };

  useEffect(() => {
    setChangesImgsList(false);
  }, [changesImgsList]);

  const createTwits = () => {
    if (imgs.length > 0 || text.length > 0) {
      const formData = new FormData();

      formData.append("text", text);
      imgs.forEach((img) => {
        formData.append("imgs", img);
      });

      dispatch(tweetOptionsActions.createTweet(formData));
      // await twitAPI.createTwitByUser(formData).then((newTwit) => {
      //   if (twitsStore.twits) {
      //     twitsStore.setTwits(newTwit.twit.concat(twitsStore.twits));
      //   } else {
      //     twitsStore.setTwits(newTwit.twit);
      //   }
      // });

      infoMessageStore.setTextMessage("Twit has been sent.");
      infoMessageStore.setInfoMessageVisible(true);

      setText("");
      setImgs([]);
    }
  };

  if (text.length > 255) {
    return setText(text.slice(0, 254));
  }

  const addEmojiInTwitText = (event) => {
    setText(text + event.emoji);
  };

  return (
    <>
      <div className="twit-fotrm-block">
        <form className="twit-form">
          <div className="user-info">
            <div className="user-info-photo">
              <img alt="User" src={getUserPhoto(profile)} />
            </div>
          </div>
          <div className="twit-form-input">
            <textarea
              name="twitInputForm"
              value={text}
              autoFocus={twitFormVisible}
              className="twit-input-text"
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
            />
          </div>
        </form>
        {imgs.length > 0 && (
          <div className={getClassName(imgs)}>
            {imgs.map((img) => (
              <div className="wrapper-twit-img" key={imgs.indexOf(img)}>
                <div
                  className="twit-form-button-delete"
                  onClick={() => deleteSelectedImg(imgs.indexOf(img))}
                >
                  <img src={close} alt="close-icon" className="close-icon" />
                </div>
                <img
                  src={URL.createObjectURL(img)}
                  alt="SelectPhoto"
                  className="twit-img"
                />
              </div>
            ))}
          </div>
        )}
        <div className="twit-panel">
          <div className="twit-panel-img">
            <input
              type="file"
              multiple
              accept=".jpg, .jpeg, .png"
              id="input-file"
              onChange={(e) => {
                getSelectedImgFile(e);
              }}
            />
            <label htmlFor="input-file" className="twit-form-input-file">
              <img src={imgFile} alt="File" />
            </label>
            <EmojiButton addEmojiInTwitText={addEmojiInTwitText} />
          </div>
          <button
            className="twit-panel-button-tweet"
            type="button"
            onClick={() => {
              if (twitFormVisible) {
                setTwitFormVisible(false);
              }
              createTwits();
            }}
          >
            <span>Tweet</span>
          </button>
        </div>
      </div>
    </>
  );
});

export default TwitForm;
