import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { PROFILE_PAGE_USER } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";
import ButtonBookmarkOnTwit from "./ButtonBookmarkOnTwit";
import ButtonCommentOnTwit from "./ButtonCommentOnTwit";
import ButtonLikeOnTwit from "./ButtonLikeOnTwit";
import ButtonRetwitOnTwit from "./ButtonRetwitOnTwit";

const TwitsForTrends = observer((props) => {
  const { twits } = useContext(Context);
  const navigate = useNavigate();
  const twitsTrend = [];

  const getTwitsTrend = () => {
    twits.twits.map((twit) => {
      if (twit.text) {
        if (twit.text.toLowerCase().includes(props.trend.toLowerCase())) {
          twitsTrend.push(twit);
        }
      }
    });
  };

  getTwitsTrend();
  return (
    <div className="twits">
      {twitsTrend.map((twit) => (
        <div className="user-main-content-block" key={twit.id}>
          <div
            className="user-block-twit"
            key={twit.id}
            onClick={() => navigate(PROFILE_PAGE_USER + twit.User.id)}
          >
            <div className="user-info">
              <div className="user-info-photo">
                <img alt="User" src={getUserPhoto(twit.User)} />
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

export default TwitsForTrends;
