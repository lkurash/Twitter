import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Context } from "..";
import {
  createRetwitByUser,
  getAllTwits,
  getTwitsByUser,
} from "../http/twitsApi";
import { PROFILE_PAGE_USER } from "../utils/constans";
import TooltipUserNotAuth from "./common/TooltipUserNotAuth";
import activeRetwit from "./Img/active_retweet_icon.png";
import notactiveRetwit from "./Img/notactive_retweet_icon.png";
import "./userTwitPanel.css";

const ButtonRetwitOnTwit = observer((props) => {
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);
  const location = useLocation().pathname;
  const { id } = useParams();
  const { user } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const userRetwitTwitId = [];

  const getTwits = () => {
    getAllTwits().then((allTwits) => twits.setTwits(allTwits));

    if (location === PROFILE_PAGE_USER + user.user.id) {
      getTwitsByUser(user.user.id).then((twitsById) => twits.setUserTwits(twitsById));
    } else {
      getTwitsByUser(id).then((twitsById) => twits.setUserTwits(twitsById));
    }
  };

  const createRetwitTwit = async (twit) => {
    const formData = new FormData();

    formData.append("TwitId", twit.id);
    await createRetwitByUser(formData);

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

  const onCloseTooltip = ()=>{
    setTooltipUserNotAuth(false);
  };

  getUserRetwitTwitId();
  return (
    <div className="user-twit-panel-retwit">
      {!userRetwitTwitId.includes(props.twit.id) ? (
        <>
          <TooltipUserNotAuth tooltipUserNotAuth={tooltipUserNotAuth} onCloseTooltip={onCloseTooltip} retwit/>
          <div
            className="user-twit-panel-button-retwit"
            key={props.twit.id}
            onClick={() => {
              if (user.user.isAuth) {
                retwits.setRetwitTwit(props.twit);
                createRetwitTwit(props.twit);
              }else{
                setTooltipUserNotAuth(true);
              }
            }}
            onMouseEnter={() => {
              retwits.sethoverTwitRetwit(props.twit);
            }}
            onMouseLeave={() => retwits.sethoverTwitRetwit({})}
          >
            <img src={imgButtonRetwit(props.twit)} alt="button retwit" className="user-twit-panel-retwit-img"/>
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
