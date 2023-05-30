import { observer } from "mobx-react-lite";
import "./main.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import ButtonLikeOnTwit from "./ButtonLikeOnTwit";
import ButtonCommentOnTwit from "./ButtonCommentOnTwit";
import ButtonRetwitOnTwit from "./ButtonRetwitOnTwit";
import ButtonBookmarkOnTwit from "./ButtonBookmarkOnTwit";
import { PROFILE_PAGE_USER } from "../utils/constans";
import ButtonDeleteOnTwit from "./common/ButtonDeleteOnTwit";
import getUserPhoto from "../utils/getUserPhoto";

const UserTwits = observer(() => {
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const twitsAndRetwits = [];

  const getUserRetwit = () => {
    retwits.retwits.map((retwit) => {
      twitsAndRetwits.push(retwit);
    });
  };

  const getUserTwit = () => {
    twits.userTwits.map((twit) => {
      twitsAndRetwits.push(twit);
    });
  };

  const sortTwitAndRetwit = () => {
    twitsAndRetwits.sort((a, b) => {
      const dateOne = new Date(a.createdAt);
      const dateTwo = new Date(b.createdAt);

      return dateTwo - dateOne;
    });
  };

  getUserRetwit();
  getUserTwit();
  sortTwitAndRetwit();
  return (
    <div className="twits">
      {twitsAndRetwits.map((twit) => (
        <div key={twit.id} className="twit">
          <div className="content-block">
            <div className="user-block-twit">
              <div className="user-info">
                <div className="user-info-photo">
                  {twit.Twit ? (
                    <img alt="User" src={getUserPhoto(twit.Twit.User)} onClick={() => {
                      twit.Twit && navigate(PROFILE_PAGE_USER + twit.Twit.User.id);
                    }}/>
                  ) : (
                    <img alt="User" src={getUserPhoto(twit.User)} />
                  )}
                </div>
              </div>
              <div className="twit-desc">
                <h4 className="twit-user-name" onClick={() => {
                  twit.Twit && navigate(PROFILE_PAGE_USER + twit.Twit.User.id);
                }}>
                  {twit.Twit ? twit.Twit.User.user_name : twit.User.user_name}
                </h4>
                <p className="twit-text">
                  {twit.Twit ? twit.Twit.text : twit.text}
                </p>
                {twit.Twit ? (
                  <>
                    {twit.Twit.img && (
                      <div className="wrapper-twit-img">
                        <img
                          src={`http://localhost:5500/${twit.Twit.img}`}
                          alt="Twit"
                          className="twit-img"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {twit.img && (
                      <div className="wrapper-twit-img">
                        <img
                          src={`http://localhost:5500/${twit.img}`}
                          alt="Twit"
                          className="twit-img"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            {!twit.Twit && twit.UserId === user.user.id && (
              <ButtonDeleteOnTwit twit={twit} />
            )}
          </div>
          <div className="user-twit-panel">
            {twit.Twit ? (
              <>
                <ButtonCommentOnTwit twit={twit.Twit} />
                <ButtonRetwitOnTwit twit={twit.Twit} />
                <ButtonLikeOnTwit twit={twit.Twit} />
                <ButtonBookmarkOnTwit twit={twit.Twit} />
              </>
            ) : (
              <>
                <ButtonCommentOnTwit twit={twit} />
                <ButtonRetwitOnTwit twit={twit} />
                <ButtonLikeOnTwit twit={twit} />
                <ButtonBookmarkOnTwit twit={twit} />
              </>
            )}
          </div>
          <div className="main-line" />
        </div>
      ))}
      {twitsAndRetwits.length === 0 && <p>No twits</p>}
    </div>
  );
});

export default UserTwits;
