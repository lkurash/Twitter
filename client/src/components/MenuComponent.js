import { useContext } from "react";
import "./menu.css";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import Logo from "./common/Logo";
import hashtag from "./Img/hashtag_icon.png";
import bookmark from "./Img/bookmark_icon.png";
import notification from "./Img/notification_icon.png";
import profile from "./Img/profile_icon.png";
import home from "./Img/home_icon.png";
import message from "./Img/message_icon.png";
import tweetIcon from "./Img/feather_icon.png";
import ButtonMenu from "./common/ButtonMenu";
import { Context } from "..";
import {
  BOOKMARKS_PAGE,
  EXPLORE_PAGE,
  HOME_PAGE,
  MESSAGE_PAGE,
  PROFILE_PAGE_USER,
  TWIT_PAGE,
} from "../utils/constans";
import UserInfoAndButtonSignOut from "./UserInfoAndButtonSignOut";

const MenuComponent = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <aside className="menu">
      <Logo class="logo" />
      <nav className="nav">
        {!user.isAuth ? (
          <div>
            <ButtonMenu
              type="button"
              path={hashtag}
              alt="Explore"
              class="settings-icon"
              buttonName="Explore"
              button="explore"
              nav={EXPLORE_PAGE}
            />
          </div>
        ) : (
          <div>
            <ButtonMenu
              type="button"
              path={home}
              alt="Home"
              class="home-icon"
              buttonName="Home"
              nav={HOME_PAGE}
            />
            <ButtonMenu
              type="button"
              path={hashtag}
              alt="Review"
              class="settings-icon"
              buttonName="Review"
              nav={EXPLORE_PAGE}
            />
            <ButtonMenu
              type="button"
              path={notification}
              alt="settings icon"
              class="settings-icon"
              buttonName="Notifications"
            />
            <ButtonMenu
              type="button"
              path={message}
              alt="Message"
              class="settings-icon"
              buttonName="Message"
              nav={MESSAGE_PAGE + user.user.id}
            />
            <ButtonMenu
              type="button"
              path={bookmark}
              alt="Bookmarks"
              class="settings-icon"
              buttonName="Bookmarks"
              nav={BOOKMARKS_PAGE + user.user.id}
            />

            <ButtonMenu
              type="button"
              path={profile}
              alt="Profile"
              class="settings-icon"
              buttonName="Profile"
              nav={PROFILE_PAGE_USER + user.user.id}
            />

            <button
              type="button"
              className="button-twit"
              onClick={() => navigate(TWIT_PAGE)}
            >
              <span>Tweet</span>
              <img src={tweetIcon} alt="Tweet" className="tweet-icon" />
            </button>
            <UserInfoAndButtonSignOut />
          </div>
        )}
      </nav>
    </aside>
  );
});

export default MenuComponent;
