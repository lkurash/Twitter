import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import trendClient from "../../http/trendClient";
import userClient from "../../http/userClient";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import spinner from "../../utils/spinner";

import TwitsForTrends from "../../components/TwitsForTrends";
import DotMenuButton from "../../components/buttons/DotMenuButton";
import ShowMoreTrendsTwitsButton from "../../components/buttons/ShowMoreTrendsTwitsButton";

import searchIcon from "../../components/Imgs/zoom__icon.png";
import arrowLeft from "../../components/Imgs/arrow_left_icon.png";

const TrendsPage = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const [searchParams] = useSearchParams();
  const trend = searchParams.get("trend");

  const authUserID = getAuthUserID(usersStore);

  const navigate = useNavigate();

  const [isLoadingTrends, setIsLoadingTrends] = useState(true);

  useEffect(() => {
    userClient.getUsers().then((users) => usersStore.setAllUsers(users));

    if (authUserID) {
      userClient
        .getUserProfile(authUserID)
        .then((userInfo) => usersStore.setUser(userInfo));

      trendClient
        .getTrendsTwitsForAuthUser(trend)
        .then((trendstTwits) => twitsStore.setTwits(trendstTwits));
    } else {
      trendClient
        .getPublicTrendsTwits(trend)
        .then((trendstTwits) => twitsStore.setTwits(trendstTwits));
    }

    usersStore.setAuth(getFlagIsAuth());

    setIsLoadingTrends(true);

    setTimeout(() => {
      setIsLoadingTrends(false);
    }, 300);
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
      {!isLoadingTrends ? (
        <>
          <div className="main-content">
            <TwitsForTrends trend={trend} />
          </div>
          {twitsStore.twits.length >= 7 && (
            <ShowMoreTrendsTwitsButton trend={trend} />
          )}
        </>
      ) : (
        spinner()
      )}
    </>
  );
});

export default TrendsPage;
