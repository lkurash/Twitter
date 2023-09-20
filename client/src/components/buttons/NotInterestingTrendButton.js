import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { Context } from "../..";

import trendClient from "../../http/trendClient";

import getAuthUserID from "../../utils/getAuthUserID";
import useOutsideClick from "../../utils/useOutsideClickFunction";

import dotMenu from "../Imgs/more_dots_icon.png";
import sad_smile from "../Imgs/sad_smiley_icon.png";

const NotInterestingTrendButton = observer(({ trend }) => {
  const { trendsStore } = useContext(Context);
  const { infoMessageStore } = useContext(Context);

  const tooltip = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const authUserID = getAuthUserID();

  const onClose = () => {
    setTooltipVisible(false);
  };

  const createNotInterestingTrend = async (trendId) => {
    await trendClient.createNotInterestingTrend(trendId, authUserID);
    await trendClient
      .getAllTrends(authUserID)
      .then((allTrends) => trendsStore.setTrends(allTrends));

    infoMessageStore.setTextMessage("Not interested in the trend.");
    infoMessageStore.setInfoMessageVisible(true);
  };

  useOutsideClick(tooltip, onClose, tooltipVisible);

  return (
    <div className="button-dotmenu-twit">
      {tooltipVisible && (
        <div ref={tooltip} className="tooltip-trend">
          <button
            className="button-notinteresting-trend"
            onClick={() => createNotInterestingTrend(trend.id)}
            type="reset"
          >
            <span className="button-notinteresting-trend-text">
              <img src={sad_smile} alt="Sad smile" className="sad-smile-icon" />{" "}
              Not interested
            </span>
          </button>
        </div>
      )}
      {authUserID && (
        <div
          className="dotmenu"
          onClick={() => {
            setTooltipVisible(true);
          }}
        >
          <img src={dotMenu} alt="dot menu" className="dotmenu-icon" />
        </div>
      )}
    </div>
  );
});

export default NotInterestingTrendButton;
