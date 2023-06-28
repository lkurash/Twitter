import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import {
  createTwitByUser,
  getAllTwits,
  getTwitsByUser,
} from "../http/twitsApi";
import { Context } from "..";
import imgFile from "./Img/file.png";
import close from "./Img/x_icon.png";
import getUserPhoto from "../utils/getUserPhoto";
import ButtonEmoji from "./ButtonEmoji";

const TwitForm = observer(({ setShowTwitForm }) => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const selectedFile = (e) => {
    setImg(e.target.files[0]);
  };

  const createTwits = async () => {
    try {
      const formData = new FormData();

      formData.append("text", text);
      formData.append("img", img);
      await createTwitByUser(formData);
      await getAllTwits().then((alltwits) => twits.setTwits(alltwits));
      getTwitsByUser(user.user.id).then((twitsById) =>
        twits.setUserTwits(twitsById)
      );
      setText("");
      setImg("");
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
            <img alt="User" src={getUserPhoto(user.user)} />
          </div>
        </div>
        <form className="twit-form">
          <div className="twit-form-input">
            <textarea
              value={text}
              className="twit-form-input-text"
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
            />
          </div>
          {img && (
            <div className="wrapper-twit-form-img">
              <div
                className="twit-form-button-delete"
                onClick={() => setImg("")}
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
                onChange={selectedFile}
              />
              <label htmlFor="input-file" className="twit-form-input-file">
                <img src={imgFile} alt="File" />
              </label>
              <ButtonEmoji addEmojiInTwitText={addEmojiInTwitText} />
            </div>
            <button
              type="button"
              onClick={() => {
                if (setShowTwitForm) {
                  setShowTwitForm(false);
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
