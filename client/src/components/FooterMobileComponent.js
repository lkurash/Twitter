import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  PRIVATE_BOOKMARKS_PAGE_PATH,
  PRIVATE_HOME_PAGE_PATH,
  PRIVATE_PROFILE_PAGE_USER_PATH,
} from "../utils/constans";

import home from "./Img/home_icon.png";
import bookmark from "./Img/bookmark_icon.png";
import profile from "./Img/profile_icon.png";
import tweetIcon from "./Img/feather_icon.png";
import PopUpWriteTwit from "./PopUpWriteTwit";

import "./footer.css";

function FooterMobileComponent() {
  const navigate = useNavigate();
  const [twitFormVisible, setTwitFormVisible] = useState(false);

  return (
    <footer className="footer-mobile">
      <div
        className="footer-mobile-tweet-button"
        type="button"
        onClick={() => setTwitFormVisible(true)}
      >
        <img src={tweetIcon} alt="tweet" className="button-icon-menu" />
      </div>
      {twitFormVisible && (
        <PopUpWriteTwit
          twitFormVisible={twitFormVisible}
          setTwitFormVisible={setTwitFormVisible}
        />
      )}

      <div className="footer-buttons-mobile">
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(PRIVATE_HOME_PAGE_PATH)}
        >
          <img src={home} alt="home" className="button-icon-menu" />
        </div>
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(PRIVATE_BOOKMARKS_PAGE_PATH)}
        >
          <img src={bookmark} alt="bookmark" className="button-icon-menu" />
        </div>
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(PRIVATE_PROFILE_PAGE_USER_PATH)}
        >
          <img src={profile} alt="profile" className="button-icon-menu" />
        </div>
      </div>
    </footer>
  );
}

export default FooterMobileComponent;
