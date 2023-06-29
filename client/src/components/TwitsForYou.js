import { observer } from "mobx-react-lite";
import "./main.css";
import { useContext } from "react";
import { Context } from "..";
import Twit from "./Twit";
import retwitIcon from "./Img/notactive_retweet_icon.png";

const TwitsForYou = observer(({ showTwitsForYou }) => {
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);
  const twitsAndRetwits = [];

  const getUserRetwit = () => {
    retwits.retwits.map((retwit) => {
      return twitsAndRetwits.push(retwit);
    });
  };

  const getTwits = () => {
    if (twits.twits) {
      twits.twits.map((twit) => {
        return twitsAndRetwits.push(twit);
      });
    }
  };

  const sortTwitAndRetwit = () => {
    twitsAndRetwits.sort((a, b) => {
      const dateOne = new Date(a.createdAt);
      const dateTwo = new Date(b.createdAt);

      return dateTwo - dateOne;
    });
  };

  getUserRetwit();
  getTwits();
  sortTwitAndRetwit();

  if (!showTwitsForYou) return null;

  return (
    <div className="twits">
      {twitsAndRetwits.map((twit) => (
        <>
          {twit.Twit && (
            <div className="retwit-info-twit">
              <img src={retwitIcon} alt="Retwit" /> <p>You retweeted</p>
            </div>
          )}
          <Twit key={twit.createdAt} twit={twit.Twit ? twit.Twit : twit} />
        </>
      ))}
      {twitsAndRetwits.length === 0 && <p className="empty-twits">No twits</p>}
    </div>
  );
});

export default TwitsForYou;
