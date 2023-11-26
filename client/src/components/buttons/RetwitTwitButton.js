import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";
import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeRetwit from "../Imgs/active_retweet_icon.png";
import notactiveRetwit from "../Imgs/notactive_retweet_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { tweetOptionsActions } from "../../redux/tweetOptions/tweetOptions.actions";

const RetwitTwitButton = observer(({ twit, retweet }) => {
  const { isAuth } = useSelector(auth);
  const dispatch = useDispatch();
  const { retwitsStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const authUserID = getAuthUserID();

  const createRetwitTwit = async (twit) => {
    const formData = new FormData();
    formData.append("text", twit.text);
    formData.append("twitUserId", twit.userId);
    if (twit.img) {
      formData.append("img", twit.img);
    }

    dispatch(tweetOptionsActions.createRetweet(authUserID, twit.id, formData));
  };

  const deleteRetwit = async (twit) => {
    dispatch(tweetOptionsActions.deleteRetweet(twit.id, authUserID));
  };

  const imgOnTweet = (twit) => {
    if (twit.id === retwitsStore.hoverTwitRetwit.id) {
      return activeRetwit;
    }

    return notactiveRetwit;
  };

  const imgOnRetweetedTweet = (twit) => {
    if (twit.id === retwitsStore.hoverTwitRetwit.id) {
      return notactiveRetwit;
    }
    return activeRetwit;
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="twit-action-retwit">
      <TooltipUserNotAuth
        tooltipUserNotAuth={tooltipUserNotAuth}
        onCloseTooltip={onCloseTooltip}
        retwit
      />
      <div
        className="twit-action-button-retwit"
        key={twit.id}
        onClick={() => {
          if (isAuth) {
            if (retweet) {
              deleteRetwit(twit);
            } else {
              createRetwitTwit(twit);
            }
          } else {
            setTooltipUserNotAuth(true);
          }
        }}
        onMouseEnter={() => {
          retwitsStore.sethoverTwitRetwit(twit);
        }}
        onMouseLeave={() => retwitsStore.sethoverTwitRetwit({})}
      >
        <img
          src={retweet ? imgOnRetweetedTweet(twit) : imgOnTweet(twit)}
          alt="button retwit"
          className="twit-action-retwit-img"
        />
      </div>

      {twit.countRetwits > 0 && <p>{twit.countRetwits}</p>}
    </div>
  );
});

export default RetwitTwitButton;
