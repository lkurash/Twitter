import { useState } from "react";
import { useSelector } from "react-redux";

import { userProfile } from "../redux/user/user.selectors";

import getUserPhoto from "../utils/getUserPhoto";

import MainButtonPanelHomePage from "./MainButtonPanelHomePage";
import MobileMenuComponent from "../pages/MobileMenuComponent";
import ArrowLeft from "./buttons/ArrowLeft";

const MainStikyPanel = ({ homePage, pageName, userName, arrowVisible }) => {
  const { profile } = useSelector(userProfile);
  const [visibleMobileMenu, setVisibleMobileMenu] = useState(false);

  return (
    <>
      <div className="main-stiky-panel">
        <div className="main-page-name-wrapper">
          {arrowVisible ? (
            <ArrowLeft />
          ) : (
            <div
              className="button-user-profile"
              onClick={() => {
                setVisibleMobileMenu(!visibleMobileMenu);
              }}
            >
              <div className="user-info-photo">
                <img alt="User" src={getUserPhoto(profile)} />
              </div>
            </div>
          )}

          <div className="main-page-name">
            <h2>{pageName}</h2>
            {userName && <p>@{userName}</p>}
          </div>
        </div>
        {homePage && <MainButtonPanelHomePage homePage={homePage} />}
        <MobileMenuComponent
          page={"privatePage"}
          profile={profile}
          setVisibleMobileMenu={setVisibleMobileMenu}
          visibleMobileMenu={visibleMobileMenu}
        />
      </div>
    </>
  );
};

export default MainStikyPanel;
