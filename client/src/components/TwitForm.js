import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useLocation, useNavigate } from "react-router-dom";
import { createTwitByUser } from "../hhtp/twitsApi";
import { Context } from "..";
import imgFile from "./Img/file.png";
import close from "./Img/x_icon.png";
import getUserPhoto from "../utils/getUserPhoto";

const TwitForm = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const selectedFile = (e) => {
    setImg(e.target.files[0]);
  };

  const createTwits = () => {
    try {
      const formData = new FormData();

      formData.append("text", text);
      formData.append("img", img);
      createTwitByUser(formData);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  if (text.length > 255) {
    return setText(text.slice(0, 254));
  }

  return (
    <div className="user-block-twit">
      <div className="user-info">
        <div className="user-info-photo">
          <img alt="User" src={getUserPhoto(user.user)} />
        </div>
      </div>
      <form className="twit-form">
        <div className="twit-form-input-text">
          <InputEmoji
            cleanOnEnter
            borderRadius="0"
            borderColor="#000000"
            value={text}
            placeholder="What is happening?"
            onChange={setText}
          />
        </div>
        {img && (
          <div>
            <div className="twit-form-button-delete" onClick={() => setImg("")}>
              <img src={close} alt="close-icon" className="close-icon" />
            </div>
            <img
              src={URL.createObjectURL(img)}
              alt="SelectPhoto"
              className="twit-form-selected-file-img"
            />
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
          </div>
          {location === "/twit" ? (
            <button
              type="button"
              onClick={() => {
                createTwits();
                navigate(-1);
              }}
            >
              <span>Tweet</span>
            </button>
          ) : (
            <button onClick={createTwits}>
              <span>Tweet</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
});

export default TwitForm;
