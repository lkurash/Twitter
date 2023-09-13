import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import twitClient from "../../http/twitClient";

import getUserPhoto from "../../utils/getUserPhoto";
import ButtonEmoji from "../buttons/ButtonEmoji";

import imgFile from "../Img/file.png";
import close from "../Img/x_icon.png";

const TwitForm = observer(({ twitFormVisible, setTwitFormVisible }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const getSelectedImgFile = (e) => {
    setImg(e.target.files[0]);
  };

  const deleteSelectedImg = () => {
    setImg("");
    document.getElementById("input-file").value = "";
  };

  const createTwits = async () => {
    try {
      if (img || text.length > 0) {
        const formData = new FormData();

        formData.append("text", text);
        formData.append("img", img);

        await twitClient.createTwitByUser(formData).then((newTwit) => {
          if (twitsStore.twits) {
            twitsStore.setTwits(newTwit.twit.concat(twitsStore.twits));
          } else {
            twitsStore.setTwits(newTwit.twit);
          }
        });

        setText("");
        setImg("");
      }
    } catch (error) {
      console.log(error.response.data.message);
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
      <div className="user-block-twit">
        <div className="user-info">
          <div className="user-info-photo">
            <img alt="User" src={getUserPhoto(usersStore.user)} />
          </div>
        </div>
        <form className="twit-form">
          <div className="twit-form-input">
            <textarea
              value={text}
              autoFocus={twitFormVisible}
              className="twit-input-text"
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
            />
          </div>
          {img && (
            <div className="wrapper-twit-form-img">
              <div
                className="twit-form-button-delete"
                onClick={deleteSelectedImg}
              >
                <img src={close} alt="close-icon" className="close-icon" />
              </div>
              <div className="wrapper-twit-img twit-form-img">
                <img
                  src={URL.createObjectURL(img)}
                  alt="SelectPhoto"
                  className="twit-img"
                />
              </div>
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
              <ButtonEmoji addEmojiInTwitText={addEmojiInTwitText} />
            </div>
            <button
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
        </form>
      </div>
    </>
  );
});

export default TwitForm;
