import { observer } from "mobx-react-lite";

import Tweets from "./Tweets";

const TweetsForTrends = observer(({ trend }) => {
  return (
    <div className="main-content">
      <Tweets
        message={
          <div className="lack-tweets-message">
            <h2>No tweets yet.</h2>
          </div>
        }
        trend={trend}
      />
    </div>
  );
});

export default TweetsForTrends;
