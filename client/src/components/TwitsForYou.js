import { observer } from "mobx-react-lite";
import "./main.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import undefinedUserPhoto from "./Img/user_photo.jpeg";
import ButtonLikeOnTwit from "./ButtonLikeOnTwit";
import ButtonRetwitOnTwit from "./ButtonRetwitOnTwit";
import ButtonBookmarkOnTwit from "./ButtonBookmarkOnTwit";
import ButtonCommentOnTwit from "./ButtonCommentOnTwit";
import { PROFILE_PAGE_USER } from "../utils/constans";

const TwitsForYou = observer(({showTwitsForYou}) => {
  const { twits } = useContext(Context);
  const navigate = useNavigate();

  if (!showTwitsForYou) return null;

  return (
    <div className="twits">
      {twits.twits.map((twit) => (
        <div className="user-main-content-block" key={twit.id}>
          <div
            className="user-block-twit"
            key={twit.id}
            onClick={() => navigate(PROFILE_PAGE_USER + twit.User.id)}
          >
            <div className="user-info">
              <div className="user-info-photo">
                {twit.User.photo ? (
                  <img
                    alt="User"
                    src={`http://localhost:5500/${twit.User.photo}`}
                  />
                ) : (
                  <img alt="User" src={undefinedUserPhoto} />
                )}
              </div>
            </div>
            <div className="twit-desc">
              <h4 className="twit-user-name">{twit.User.user_name}</h4>
              <p className="twit-text">{twit.text}</p>
              {twit.img && (
                <div className="wrapper-twit-img">
                  <img
                    src={`http://localhost:5500/${twit.img}`}
                    alt=""
                    className="twit-img"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="user-twit-panel">
            <ButtonCommentOnTwit twit={twit} />
            <ButtonRetwitOnTwit twit={twit} />
            <ButtonLikeOnTwit twit={twit} />
            <ButtonBookmarkOnTwit twit={twit} />
          </div>
          <div className="main-line" />
        </div>
      ))}
    </div>
  );
});

export default TwitsForYou;
