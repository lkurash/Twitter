import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import getAuthUserID from "../../utils/getAuthUserID";

import DotMenuButton from "../../components/buttons/DotMenuButton";
import searchIcon from "../../components/Imgs/zoom__icon.png";
import arrowLeft from "../../components/Imgs/arrow_left_icon.png";
import TwitsForTrends from "../../components/TwitsForTrends";

const TrendsPage = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const trend = searchParams.get("trend");

  const authUserID = getAuthUserID();

  const navigate = useNavigate();

  useEffect(() => {
    if (authUserID) {
      dispatch(tweetActions.getTweetsForTrendsAuthUser(trend));
    } else {
      dispatch(tweetActions.getTweetsForTrends(trend));
    }
  }, [trend]);

  return (
    <>
      <div className="page-trands-search-block">
        <div
          className="main-search-block-button-return"
          onClick={() => navigate(-1)}
        >
          <img src={arrowLeft} alt="Button return" />
        </div>
        <div className="main-search-form-explore">
          <div className="main-search-form">
            <img
              src={searchIcon}
              alt="search_icon"
              className="main-search-icon"
            />
            <div className="main-input">
              {" "}
              <p>#{trend}</p>
            </div>
          </div>
        </div>
        <div className="mobile-button-main-settings">
          <DotMenuButton />
        </div>
      </div>
      <TwitsForTrends trend={trend} />
    </>
  );
};

export default TrendsPage;
