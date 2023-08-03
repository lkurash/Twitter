import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "..";

import {
  BOOKMARKS_PAGE_PATH,
  HOME_PAGE_PATH,
  PROFILE_PAGE_USER_PATH,
} from "../utils/constans";

import home from "./Img/home_icon.png";
import bookmark from "./Img/bookmark_icon.png";
import profile from "./Img/profile_icon.png";
import tweetIcon from "./Img/feather_icon.png";
import PopUpWriteTwit from "./PopUpWriteTwit";

import "./footer.css";

function FooterMobileComponent() {
  const navigate = useNavigate();
  const { usersStore } = useContext(Context);
  const [showTwitForm, setShowTwitForm] = useState(false);

  return (
    <footer className="footer-mobile">
      <div
        className="footer-mobile-tweet-button"
        type="button"
        onClick={() => setShowTwitForm(true)}
      >
        <img src={tweetIcon} alt="tweet" className="button-icon-menu" />
      </div>
      <PopUpWriteTwit
        showTwitForm={showTwitForm}
        setShowTwitForm={setShowTwitForm}
      />

      <div className="footer-buttons-mobile">
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(HOME_PAGE_PATH)}
        >
          <img src={home} alt="home" className="button-icon-menu" />
        </div>
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(BOOKMARKS_PAGE_PATH)}
        >
          <img src={bookmark} alt="bookmark" className="button-icon-menu" />
        </div>
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(PROFILE_PAGE_USER_PATH + usersStore.user.id)}
        >
          <img src={profile} alt="profile" className="button-icon-menu" />
        </div>
      </div>
    </footer>
  );
}

export default FooterMobileComponent;
