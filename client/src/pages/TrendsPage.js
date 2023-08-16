import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import SidebarContent from "../components/SidebarContent";
import TwitsForTrends from "../components/TwitsForTrends";
import ButtonDotMenu from "../components/buttons/ButtonDotMenu";

import searchIcon from "../components/Img/zoom__icon.png";
import arrowLeft from "../components/Img/arrow_left_icon.png";
import "../App.css";
import "../components/common/common.css";
import trendsApi from "../http/trendsApi";
import ButtonShowMoreTrendsTwits from "../components/buttons/ButtonShowMoreTrendsTwits";
import getAuthUserID from "../utils/getAuthUserID";
import userApi from "../http/userApi";
import getFlagIsAuth from "../utils/getFlagIsAuth";

const TrendsPage = observer(() => {
  const { usersStore } = useContext(Context);
  const { trendsStore } = useContext(Context);
  const { trend } = useParams();
  const authUserID = getAuthUserID(usersStore);

  const navigate = useNavigate();

  useEffect(() => {
    trendsApi
      .getTrendsTwits(trend)
      .then((trendstTwits) => trendsStore.setTrendsTwits(trendstTwits));
    userApi.getAllUsers().then((users) => usersStore.setAllUsers(users));
    if (authUserID) {
      userApi
        .getUserById(authUserID)
        .then((userInfo) => usersStore.setUser(userInfo));
    }
    
    usersStore.setAuth(getFlagIsAuth());
  }, [trend]);

  return (
    <>
      <main className="main-wrapper">
        <div className="main">
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
              <ButtonDotMenu />
            </div>
          </div>
          <div className="user-main-content">
            <TwitsForTrends trend={trend} />
          </div>
          {trendsStore.trensTwits.length >= 7 && (
            <ButtonShowMoreTrendsTwits trend={trend} />
          )}
        </div>
      </main>
      <SidebarContent />
    </>
  );
});

export default TrendsPage;
