import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";
import "./userTwitPanel.css";
import {
  createFavoriteTwitByUser,
  getAllTwits,
  getTwitsByUser,
} from "../http/twitsApi";
import activeBookmark from "./Img/active_bookmark_icon.png";
import notactiveBookmark from "./Img/notactive_bookmark_icon.png";
import hoverBookmark from "./Img/hover_bookmark.png";
import TooltipUserNotAuth from "./common/TooltipUserNotAuth";
import getAuthUserID from "../utils/getAuthUserID";

const ButtonBookmarkOnTwit = observer((props) => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const userPage = useParams();
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const userBookmarksTwitId = [];

  const getTwits = () => {
    getAllTwits().then((alltwits) => twits.setTwits(alltwits));

    if (user.isAuth) {
      const authUserID = getAuthUserID(user)

      getTwitsByUser(authUserID).then((twitsById) =>
        twits.setUserTwits(twitsById)
      );
    } else {
      getTwitsByUser(userPage.id).then((twitsById) =>
        twits.setUserTwits(twitsById)
      );
    }
  };

  const createFavoriteTwits = async (twit) => {
    const formData = new FormData();

    formData.append("TwitId", twit.id);
    await createFavoriteTwitByUser(formData);
    getTwits();
  };

  const hoverAndActiveButtonBookmark = (twit) => {
    if (twit.id === twits.hoverTwitBookmark.id) {
      return hoverBookmark;
    }
    if (twit.id === twits.favoriteTwit.id) {
      return activeBookmark;
    }
    return notactiveBookmark;
  };

  const notActiveButtonBookmark = (twit) => {
    if (twit.id === twits.deleteFavoriteTwit.id) {
      return notactiveBookmark;
    }
    return activeBookmark;
  };

  const getUserBookmarksTwitId = () => {
    twits.twits.map((twit) => {
      twit.Favorite_twits.forEach((bookmark) => {
        if (
          bookmark.UserId === user.userPage.id ||
          bookmark.UserId === user.user.id
        ) {
          userBookmarksTwitId.push(twit.id);
        }
      });
    });
  };

  getUserBookmarksTwitId();

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="user-twit-panel-bookmark">
      {!userBookmarksTwitId.includes(props.twit.id) ? (
        <>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            bookmark
          />
          <div
            className="user-twit-panel-button-bookmark"
            key={props.twit.id}
            onClick={() => {
              if (user.isAuth) {
                twits.setFavoriteTwit(props.twit);
                createFavoriteTwits(props.twit);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
            onMouseEnter={() => {
              twits.sethoverTwitBookmark(props.twit);
            }}
            onMouseLeave={() => twits.sethoverTwitBookmark({})}
          >
            <img
              src={hoverAndActiveButtonBookmark(props.twit)}
              alt="Bookmark"
              className="user-twit-panel-bookmark-img"
            />
          </div>
        </>
      ) : (
        <div
          className="user-twit-panel-button-bookmark"
          key={props.twit.id}
          onClick={() => {
            twits.setDeleteFavoriteTwit(props.twit);
            twits.setFavoriteTwit({});
            createFavoriteTwits(props.twit);
          }}
          onMouseEnter={() => {
            twits.sethoverTwitBookmark(props.twit);
          }}
          onMouseLeave={() => twits.sethoverTwitBookmark({})}
        >
          <img
            src={notActiveButtonBookmark(props.twit)}
            alt="Bookmark"
            className="user-twit-panel-bookmark-img"
          />
        </div>
      )}
    </div>
  );
});

export default ButtonBookmarkOnTwit;
