import getAuthUserID from "../utils/getAuthUserID";

import ButtonDeleteTwit from "./buttons/ButtonDeleteTwit";
import TwitActions from "./TwitActions";
import TwitDesc from "./TwitDesc";
import UserPhoto from "./UserPhoto";
import UserName from "./UserName";

import "./twitActions.css";
import "./twit.css";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import { Fragment } from "react";

const Twit = ({ twit }) => {
  const authUserID = getAuthUserID();

  return (
    <>
      <div className="twit">
        {twit.retwit ? (
          <Fragment>
            <TooltipRetwitOnTwit
              retwit={twit}
              key={`tooltip-${twit.id}`}
              user={twit.user}
            />
            <div className="user-block-twit">
              <UserPhoto twit={twit} user={twit.twit_user} />
              <div className="twit-user-name-and-content">
                <UserName twit={twit} user={twit.twit_user} />
                <TwitDesc twit={twit} user={twit.twit_user} />
              </div>
              {authUserID === twit.userId && (
                <ButtonDeleteTwit twit={twit} key={`button-${twit.id}`} />
              )}
            </div>
            {/* <TwitDesc twit={twit} user={twit.twit_user} /> */}
          </Fragment>
        ) : (
          <>
            <div className="user-block-twit">
              <UserPhoto twit={twit} user={twit.user} />
              <div className="twit-user-name-and-content">
                <UserName twit={twit} user={twit.user} />
                <TwitDesc twit={twit} user={twit.user} />
              </div>
              {authUserID === twit.userId && (
                <ButtonDeleteTwit twit={twit} key={`button-${twit.id}`} />
              )}
            </div>
            {/* <TwitDesc twit={twit} user={twit.user} /> */}
          </>
        )}
        <TwitActions twit={twit} />
      </div>
      <div className="main-line" />
    </>
  );
};
export default Twit;
