import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import Twit from "./Twit";

const TwitsForTrends = observer(({ trend }) => {
  const { twitsStore } = useContext(Context);

  return (
    <div className="twits">
      {twitsStore.twits.map((twit) => (
        <Twit twit={twit} key={twit.id} />
      ))}
    </div>
  );
});

export default TwitsForTrends;
