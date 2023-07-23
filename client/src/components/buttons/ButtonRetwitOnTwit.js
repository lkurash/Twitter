import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import {
  createRetwitByUser,
  getAllTwits,
  getCountRetwits,
  getTwitsByUser,
} from "../../http/twitsApi";
import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeRetwit from "../Img/active_retweet_icon.png";
import notactiveRetwit from "../Img/notactive_retweet_icon.png";
import "../userTwitPanel.css";

const ButtonRetwitOnTwit = observer(({ twit }) => {
  const { twitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const userPage = useParams();
  const { usersStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const userRetwitTwitId = [];
  const authUserID = getAuthUserID(usersStore);

  const getTwits = () => {
    getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));

    if (usersStore.isAuth) {
      getTwitsByUser(authUserID).then((usersTwits) =>
        twitsStore.setUserTwits(usersTwits)
      );
    } else {
      getTwitsByUser(userPage.id).then((usersTwits) =>
        twitsStore.setUserTwits(usersTwits)
      );
    }
  };

  const createRetwitTwit = async (twit) => {
    const formData = new FormData();
    formData.append("text", twit.text);
    formData.append("twitUserId", twit.UserId);
    if (twit.img) {
      formData.append("img", twit.img);
    }
    await createRetwitByUser(authUserID, twit.id, formData);

    await getCountRetwits(twit.id);

    getTwits();
  };

  const imgButtonRetwit = (twit) => {
    if (twit.id === retwitsStore.hoverTwitRetwit.id) {
      return activeRetwit;
    }
    if (twit.id === retwitsStore.retwitTwit.id) {
      return activeRetwit;
    }
    return notactiveRetwit;
  };

  const deleteActiveRetwitButtonImg = (twit) => {
    if (twit.id === retwitsStore.deleteRetwit.id) {
      return notactiveRetwit;
    }
    return activeRetwit;
  };

  const getUserRetwitTwitId = () => {
    twitsStore.twits.map((twit) => {
      if (twit.retwit && twit.UserId === usersStore.user.id) {
        userRetwitTwitId.push(twit.twitId);
      }
    });
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  getUserRetwitTwitId();

  return (
    <div className="user-twit-panel-retwit">
      {!userRetwitTwitId.includes(twit.id) ? (
        <>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            retwit
          />
          <div
            className="user-twit-panel-button-retwit"
            key={twit.id}
            onClick={() => {
              if (usersStore.isAuth) {
                retwitsStore.setRetwitTwit(twit);
                createRetwitTwit(twit);
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
              src={imgButtonRetwit(twit)}
              alt="button retwit"
              className="user-twit-panel-retwit-img"
            />
          </div>
        </>
      ) : (
        <div
          className="user-twit-panel-button-retwit"
          key={twit.id}
          onMouseEnter={() => {
            retwitsStore.sethoverTwitRetwit(twit);
          }}
          onMouseLeave={() => retwitsStore.sethoverTwitRetwit({})}
          onClick={() => {
            retwitsStore.setDeleteRetwit(twit);
            createRetwitTwit(twit);
            retwitsStore.setRetwitTwit({});
          }}
        >
          <img
            src={deleteActiveRetwitButtonImg(twit)}
            alt="button retwit"
            className="user-twit-panel-retwit-img"
          />
        </div>
      )}
      {twit.countRetwits > 0 && <p>{twit.countRetwits}</p>}
    </div>
  );
});

export default ButtonRetwitOnTwit;
