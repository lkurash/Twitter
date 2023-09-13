import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import twitClient from "../../http/twitClient";

import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeRetwit from "../Img/active_retweet_icon.png";
import notactiveRetwit from "../Img/notactive_retweet_icon.png";
import "../userTwitPanel.css";

const ButtonRetwitOnTwit = observer(({ twit }) => {
  const { twitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const authUserID = getAuthUserID(usersStore);

  const getCountRetwits = async (originalTwitId, retwitId) => {
    await twitClient.getCountRetwits(originalTwitId).then((retwit) => {
      if (retwit) {
        twitsStore.addRetwitTwit(retwit);
        twitsStore.deleteRetwit(originalTwitId, retwitId);
      }
    });
  };

  const createRetwitTwit = async (twit) => {
    const formData = new FormData();
    formData.append("text", twit.text);
    formData.append("twitUserId", twit.userId);
    if (twit.img) {
      formData.append("img", twit.img);
    }
    await twitClient
      .createRetwitByUser(authUserID, twit.id, formData)
      .then((retwit) => {
        if (retwit) {
          twitsStore.setTwits(retwit.concat(twitsStore.twits));
          twitsStore.setTwitsWhoReading(
            retwit.concat(twitsStore.twitsWhoReading)
          );
        }
      });

    await twitClient.getCountRetwits(twit.id).then((retwit) => {
      if (retwit) {
        twitsStore.addRetwitTwit(retwit);
      }
    });
  };

  const deleteRetwit = async (twit) => {
    twitClient.deleteRetwit(twit.id, authUserID).then((deleteTwit) => {
      getCountRetwits(deleteTwit[0].originalTwit, deleteTwit[0].retwit);
    });
  };

  const hoverAndActiveButtonRetwit = (twit) => {
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

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="user-twit-panel-retwit">
      {(twit.retwit && twit.userId === authUserID) || twit.retwitsAuthUser ? (
        <div
          className="user-twit-panel-button-retwit"
          key={twit.id}
          onMouseEnter={() => {
            retwitsStore.sethoverTwitRetwit(twit);
          }}
          onMouseLeave={() => retwitsStore.sethoverTwitRetwit({})}
          onClick={() => {
            retwitsStore.setDeleteRetwit(twit);
            deleteRetwit(twit);
            retwitsStore.setRetwitTwit({});
          }}
        >
          <img
            src={deleteActiveRetwitButtonImg(twit)}
            alt="button retwit"
            className="user-twit-panel-retwit-img"
          />
        </div>
      ) : (
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
              src={hoverAndActiveButtonRetwit(twit)}
              alt="button retwit"
              className="user-twit-panel-retwit-img"
            />
          </div>
        </>
      )}
      {twit.countRetwits > 0 && <p>{twit.countRetwits}</p>}
    </div>
  );
});

export default ButtonRetwitOnTwit;
