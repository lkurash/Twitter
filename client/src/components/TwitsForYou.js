import { observer } from "mobx-react-lite";
import "./main.css";
import { useContext } from "react";
import { Context } from "..";
import { ColorRing } from "react-loader-spinner";
import Twit from "./Twit";

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

  if (twits.twits.length === 0) {
    return (
      <div className="load-spinner">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#1d9bf0", "#2188cc", "#1d9bf0", "#2188cc", "#1d9bf0"]}
        />
      </div>
    );
  }

  return (
    <div className="twits">
      {twitsAndRetwits.map((twit) => (
        <Twit twit={twit.Twit ? twit.Twit : twit} key={twit.createdAt} />
      ))}
      {twitsAndRetwits.length === 0 && <p className="empty-twits">No twits</p>}
    </div>
  );
});

export default TwitsForYou;
