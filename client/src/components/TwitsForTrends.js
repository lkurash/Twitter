import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import Twit from "./Twit";

const TwitsForTrends = observer(({ trend }) => {
  const { trendsStore } = useContext(Context);
  
  return (
    <div className="twits">
      {trendsStore.trensTwits.map((twit) => (
        <Twit twit={twit} key={twit.id} />
      ))}
    </div>
  );
});

export default TwitsForTrends;
