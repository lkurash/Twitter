import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { Context } from "../..";

import trendsClient from "../../http/trendsClient";

import getAuthUserID from "../../utils/getAuthUserID";
import useOutsideClick from "../../utils/useOutsideClickFunction";

import dotMenu from "../Img/more_dots_icon.png";
import sad_smile from "../Img/sad_smiley_icon.png";

const ButtonOnTrend = observer(({ trend }) => {
  const { trendsStore } = useContext(Context);
  const tooltip = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const authUserID = getAuthUserID();

  const onClose = () => {
    setTooltipVisible(false);
  };

  const createNotInterestingTrend = async (trendId) => {
    await trendsClient.createNotInterestingTrend(trendId, authUserID);
    await trendsClient
      .getAllTrends(authUserID)
      .then((allTrends) => trendsStore.setTrends(allTrends));
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

export default ButtonOnTrend;
