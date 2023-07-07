import { useContext } from "react";
import { Context } from "..";
import getAuthUserID from "../utils/getAuthUserID";
import retwitIcon from "./Img/notactive_retweet_icon.png";

const TooltipRetwitOnTwit = ({ retwit }) => {
  const { user } = useContext(Context);

  console.log(retwit);

  return (
    <>
      {retwit && (
        <>
          {retwit.UserId === getAuthUserID(user) ? (
            <div className="retwit-info-twit">
              <img src={retwitIcon} alt="Retwit" /> <p>You retweeted</p>
            </div>
          ) : (
            <div className="retwit-info-twit">
              <img src={retwitIcon} alt="Retwit" /> <p>Retweeted</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TooltipRetwitOnTwit;
