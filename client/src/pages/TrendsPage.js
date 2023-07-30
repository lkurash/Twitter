import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import SidebarContent from "../components/SidebarContent";
import { getAllTwits } from "../http/twitsApi";
import TwitsForTrends from "../components/TwitsForTrends";
import ButtonDotMenu from "../components/buttons/ButtonDotMenu";

import searchIcon from "../components/Img/zoom__icon.png";
import arrowLeft from "../components/Img/arrow_left_icon.png";
import "../App.css";
import "../components/common/common.css";

const TrendsPage = observer(() => {
  const { twitsStore } = useContext(Context);
  const { trend } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));
  });

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
            <div className="main-search-form">
              <img
                src={searchIcon}
                alt="search_icon"
                className="main-search-icon"
              />
              <div>
                <div className="main-input"> #{trend}</div>
              </div>
            </div>
            <div className="mobile-button-main-settings">
              <ButtonDotMenu />
            </div>
          </div>
          <div className="user-main-content">
            <TwitsForTrends trend={trend} />
          </div>
        </div>
      </main>
      <SidebarContent />
    </>
  );
});

export default TrendsPage;
