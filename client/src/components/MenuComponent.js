import { useContext } from "react";
import "./menu.css";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./common/Logo";
import hashtag from "./Img/hashtag_icon.png";
import bookmark from "./Img/bookmark_icon.png";
import notification from "./Img/notification_icon.png";
import profile from "./Img/profile_icon.png";
import home from "./Img/home_icon.png";
import message from "./Img/message_icon.png";
import ButtonMenu from "./common/ButtonMenu";
import { Context } from "..";
import {
  BOOKMARKS_PAGE,
  EXPLORE_PAGE,
  HOME_PAGE,
  MESSAGE_PAGE,
  PROFILE_PAGE_USER
} from "../utils/constans";
import UserInfoAndButtonSignOut from "./UserInfoAndButtonSignOut";
import ButtonWriteTwit from "./ButtonWriteTwit";

const MenuComponent = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation().pathname;

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
              class="button-icon-menu"
              buttonName="Explore"
              button={
                location === "/explore" || location === "/"
                  ? "active-button-explore"
                  : "notactive-button-explore"
              }
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
              alt="Explore"
              class="button-icon-menu"
              buttonName="Explore"
              nav={EXPLORE_PAGE}
            />
            <ButtonMenu
              type="button"
              path={notification}
              alt="settings icon"
              class="button-icon-menu"
              buttonName="Notifications"
            />
            <ButtonMenu
              type="button"
              path={message}
              alt="Message"
              class="button-icon-menu"
              buttonName="Message"
              nav={MESSAGE_PAGE + user.user.id}
            />
            <ButtonMenu
              type="button"
              path={bookmark}
              alt="Bookmarks"
              class="button-icon-menu"
              buttonName="Bookmarks"
              nav={BOOKMARKS_PAGE + user.user.id}
            />

            <ButtonMenu
              type="button"
              path={profile}
              alt="Profile"
              class="button-icon-menu"
              buttonName="Profile"
              nav={PROFILE_PAGE_USER + user.user.id}
            />

            <ButtonWriteTwit />
            <UserInfoAndButtonSignOut />
          </div>
        )}
      </nav>
    </aside>
  );
});

export default MenuComponent;
