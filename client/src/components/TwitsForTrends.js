import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import Twit from "./Twit";

const TwitsForTrends = observer((props) => {
  const { twitsStore } = useContext(Context);
  const twitsTrend = [];

  const getTwitsTrend = () => {
    twitsStore.twits.map((twit) => {
      if (twit.text) {
        if (twit.text.toLowerCase().includes(props.trend.toLowerCase())) {
          twitsTrend.push(twit);
        }
      }
    });
  };

  getTwitsTrend();
  return (
    <div className="twits">
      {twitsTrend.map((twit) => (
        <Twit twit={twit} key={twit.id} />
      ))}
    </div>
  );
});

export default TwitsForTrends;
