import "./footer.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "..";
import {
  BOOKMARKS_PAGE,
  HOME_PAGE,
  PROFILE_PAGE_USER,
} from "../utils/constans";
import home from "./Img/home_icon.png";
import bookmark from "./Img/bookmark_icon.png";
import profile from "./Img/profile_icon.png";
import tweetIcon from "./Img/feather_icon.png";
import TwitPageComponent from "./TwitPageComponent";

function FooterMobileComponent() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
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
      <TwitPageComponent
        showTwitForm={showTwitForm}
        setShowTwitForm={setShowTwitForm}
      />

      <div className="footer-buttons-mobile">
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(HOME_PAGE)}
        >
          <img src={home} alt="home" className="button-icon-menu" />
        </div>
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(BOOKMARKS_PAGE + user.user.id)}
        >
          <img src={bookmark} alt="bookmark" className="button-icon-menu" />
        </div>
        <div
          className="footer-mobile-menu-button"
          type="button"
          onClick={() => navigate(PROFILE_PAGE_USER + user.user.id)}
        >
          <img src={profile} alt="profile" className="button-icon-menu" />
        </div>
      </div>
    </footer>
  );
}

export default FooterMobileComponent;
