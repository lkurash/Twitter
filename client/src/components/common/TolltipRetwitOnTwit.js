import { useContext } from "react";
import { Context } from "../..";

import getAuthUserID from "../../utils/getAuthUserID";

import retwitIcon from "../Img/notactive_retweet_icon.png";

const TooltipRetwitOnTwit = ({ retwit }) => {
  const { usersStore } = useContext(Context);

  return (
    <>
      {retwit && (
        <>
          {retwit.userId === getAuthUserID(usersStore) ? (
            <div className="twit-hint-about-retwit">
              <img src={retwitIcon} alt="Retwit" /> <p>You retweeted</p>
            </div>
          ) : (
            <div className="twit-hint-about-retwit">
              <img src={retwitIcon} alt="Retwit" /> <p>Retweeted</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TooltipRetwitOnTwit;
