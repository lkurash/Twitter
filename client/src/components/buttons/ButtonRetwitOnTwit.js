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
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);
  const userPage = useParams();
  const { user } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const userRetwitTwitId = [];
  const authUserID = getAuthUserID(user);

  const getTwits = () => {
    getAllTwits().then((alltwits) => twits.setTwits(alltwits));

    if (user.isAuth) {
      const authUserID = getAuthUserID(user);

      getTwitsByUser(authUserID).then((usersTwits) =>
        twits.setUserTwits(usersTwits)
      );
      getRetwitsByUser(authUserID).then((retwitsByUser) =>
        retwits.setRetwits(retwitsByUser)
      );
    } else {
      getTwitsByUser(userPage.id).then((usersTwits) =>
        twits.setUserTwits(usersTwits)
      );
    }
  };

  const createRetwitTwit = async (twit) => {

    await createRetwitByUser(authUserID, twit.id);

    getTwits();
  };

  const imgButtonRetwit = (twit) => {
    if (twit.id === retwits.hoverTwitRetwit.id) {
      return activeRetwit;
    }
    if (twit.id === retwits.retwitTwit.id) {
      return activeRetwit;
    }
    return notactiveRetwit;
  };

  const deleteActiveRetwitButtonImg = (twit) => {
    if (twit.id === retwits.deleteRetwit.id) {
      return notactiveRetwit;
    }
    return activeRetwit;
  };

  const getUserRetwitTwitId = () => {
    twits.twits.map((twit) => {
      twit.Retwits.forEach((retwit) => {
        if (retwit.UserId === user.user.id) {
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
              if (user.isAuth) {
                retwits.setRetwitTwit(props.twit);
                createRetwitTwit(props.twit);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
            onMouseEnter={() => {
              retwits.sethoverTwitRetwit(props.twit);
            }}
            onMouseLeave={() => retwits.sethoverTwitRetwit({})}
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
            retwits.sethoverTwitRetwit(props.twit);
          }}
          onMouseLeave={() => retwits.sethoverTwitRetwit({})}
          onClick={() => {
            retwits.setDeleteRetwit(props.twit);
            createRetwitTwit(props.twit);
            retwits.setRetwitTwit({});
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
