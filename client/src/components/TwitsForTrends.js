import { observer } from "mobx-react-lite";
import { Fragment } from "react";

import Twits from "./Twits";

const TwitsForTrends = observer(({ trend }) => {
  return (
    <Fragment>
      <Twits />
    </Fragment>
  );
});

export default TwitsForTrends;
