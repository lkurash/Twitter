import { Fragment } from "react";

import getAuthUserID from "../../utils/getAuthUserID";

import TooltipRetwitOnTwit from "../common/TolltipRetwitOnTwit";
import UserPhoto from "./UserPhoto";
import UserName from "./UserName";
import TwitDesc from "./TwitDesc";
import DeleteTwitButton from "../buttons/DeleteTwitButton";
import TwitActions from "./TwitActions";

import "./twitActions.css";
import "./twit.css";
import dot from "../Imgs/dot_icon.png";

const Twit = ({ twit, userInfo, retwit }) => {
  const authUserID = getAuthUserID();

  const isRetweet = (twit) => {
    if (twit.retwit && twit.userId === authUserID) {
      return true;
    } else {
      return twit.authUserRetwits;
    }
  };

  return (
    <>
      <div className="twit">
        {retwit && (
          <TooltipRetwitOnTwit
            retwit={twit}
            key={`tooltip-${twit.id}`}
            user={twit.userOriginalTwits}
          />
        )}
        <div className="user-block-twit">
          <UserPhoto twit={twit} user={userInfo} />
          <div className="twit-user-name-and-content">
            <div className="twit-user-name-and-data">
              <UserName twit={twit} user={userInfo} />
              <img src={dot} alt="Dot" className="dot-twit" />

              <p className="twit-data">{twit.twit_createDate}</p>
            </div>
            <TwitDesc twit={twit} user={userInfo} />
          </div>
          {authUserID === twit.userId && (
            <DeleteTwitButton twit={twit} key={`button-${twit.id}`} />
          )}
        </div>
        <TwitActions twit={twit} retweet={isRetweet(twit)} />
      </div>
      <div className="main-line" />
    </>
  );
};
export default Twit;
