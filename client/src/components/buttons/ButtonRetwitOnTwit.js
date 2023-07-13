import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import {
  createRetwitByUser,
  getAllTwits,
  getRetwitsByUser,
  getTwitsByUser,
} from "../../http/twitsApi";
import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeRetwit from "../Img/active_retweet_icon.png";
import notactiveRetwit from "../Img/notactive_retweet_icon.png";
import "../userTwitPanel.css";

const ButtonRetwitOnTwit = observer((props) => {
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
      const authUserID = getAuthUserID(usersStore);

      getTwitsByUser(authUserID).then((usersTwits) =>
        twitsStore.setUserTwits(usersTwits)
      );
      getRetwitsByUser(authUserID).then((retwitsByUser) =>
        retwitsStore.setRetwits(retwitsByUser)
      );
    } else {
      getTwitsByUser(userPage.id).then((usersTwits) =>
        twitsStore.setUserTwits(usersTwits)
      );
    }
  };

  const createRetwitTwit = async (twit) => {
    await createRetwitByUser(authUserID, twit.id);

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
      twit.Retwits.forEach((retwit) => {
        if (retwit.UserId === usersStore.user.id) {
          userRetwitTwitId.push(twit.id);
        }
      });
    });
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  getUserRetwitTwitId();

  return (
    <div className="user-twit-panel-retwit">
      {!userRetwitTwitId.includes(props.twit.id) ? (
        <>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            retwit
          />
          <div
            className="user-twit-panel-button-retwit"
            key={props.twit.id}
            onClick={() => {
              if (usersStore.isAuth) {
                retwitsStore.setRetwitTwit(props.twit);
                createRetwitTwit(props.twit);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
            onMouseEnter={() => {
              retwitsStore.sethoverTwitRetwit(props.twit);
            }}
            onMouseLeave={() => retwitsStore.sethoverTwitRetwit({})}
          >
            <img
              src={imgButtonRetwit(props.twit)}
              alt="button retwit"
              className="user-twit-panel-retwit-img"
            />
          </div>
        </>
      ) : (
        <div
          className="user-twit-panel-button-retwit"
          key={props.twit.id}
          onMouseEnter={() => {
            retwitsStore.sethoverTwitRetwit(props.twit);
          }}
          onMouseLeave={() => retwitsStore.sethoverTwitRetwit({})}
          onClick={() => {
            retwitsStore.setDeleteRetwit(props.twit);
            createRetwitTwit(props.twit);
            retwitsStore.setRetwitTwit({});
          }}
        >
          <img
            src={deleteActiveRetwitButtonImg(props.twit)}
            alt="button retwit"
            className="user-twit-panel-retwit-img"
          />
        </div>
      )}
      {props.twit.Retwits.length > 0 && <p>{props.twit.Retwits.length}</p>}
    </div>
  );
});

export default ButtonRetwitOnTwit;
