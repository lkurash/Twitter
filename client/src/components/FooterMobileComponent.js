import "./footer.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "..";
import {
  BOOKMARKS_PAGE,
  HOME_PAGE,
  PROFILE_PAGE_USER,
  TWIT_PAGE,
} from "../utils/constans";
import home from "./Img/home_icon.png";
import bookmark from "./Img/bookmark_icon.png";
import profile from "./Img/profile_icon.png";
import tweetIcon from "./Img/feather_icon.png";

function FooterMobileComponent() {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  return (
    <footer className="footer-mobile">
      <div
        className="footer-mobile-tweet-button"
        type="button"
        onClick={() => navigate(TWIT_PAGE)}
      >
        <img src={tweetIcon} alt="tweet" className="settings-icon" />
      </div>

      <div className="footer-buttons-mobile">
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(HOME_PAGE)}
        >
          <img src={home} alt="home" className="settings-icon" />
        </div>
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(BOOKMARKS_PAGE + user.user.id)}
        >
          <img src={bookmark} alt="bookmark" className="settings-icon" />
        </div>
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(PROFILE_PAGE_USER + user.user.id)}
        >
          <img src={profile} alt="profile" className="settings-icon" />
        </div>
      </div>
    </footer>
  );
}

export default FooterMobileComponent;
