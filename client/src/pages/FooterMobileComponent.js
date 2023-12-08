import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  BOOKMARKS_PAGE_PATH,
  HOME_PAGE_PATH,
  PROFILE_PAGE_USER_PATH,
} from "../utils/routs";

import PopUpWriteTweet from "../components/common/PopUpWriteTweet";

import home from "../components/Imgs/home_icon.png";
import bookmark from "../components/Imgs/bookmark_icon.png";
import profile from "../components/Imgs/profile_icon.png";
import tweetIcon from "../components/Imgs/feather_icon.png";

import "./footer.css";

function FooterMobileComponent() {
  const navigate = useNavigate();
  const [tweetFormVisible, setTweetFormVisible] = useState(false);

  return (
    <footer className="footer-mobile">
      <div
        className="footer-mobile-tweet-button"
        type="button"
        onClick={() => setTweetFormVisible(true)}
      >
        <img src={tweetIcon} alt="tweet" className="button-icon-menu" />
      </div>
      {tweetFormVisible && (
        <PopUpWriteTweet
          tweetFormVisible={tweetFormVisible}
          setTweetFormVisible={setTweetFormVisible}
        />
      )}

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
          onClick={() => navigate(PROFILE_PAGE_USER_PATH)}
        >
          <img src={profile} alt="profile" className="button-icon-menu" />
        </div>
      </div>
    </footer>
  );
}

export default FooterMobileComponent;
