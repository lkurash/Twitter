import { useContext, useEffect, useState } from "react";
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
  PROFILE_PAGE_USER,
} from "../utils/constans";
import UserInfoAndButtonSignOut from "./UserInfoAndButtonSignOut";
import ButtonWriteTwit from "./ButtonWriteTwit";

const MenuComponent = observer(() => {
  const { user } = useContext(Context);

  const checkActiveButton = (id) => {
    const idActiveButton = localStorage.activeButton;

    if (idActiveButton === id) {
      return "active-menu-button";
    } else {
      return "notactive";
    }
  };

  const buttons = [
    {
      id: "1",
      type: "button",
      img: home,
      alt: "Home",
      classNameButtonImg: "home-icon",
      buttonName: "Home",
      nav: HOME_PAGE,
    },

    {
      id: "2",
      type: "button",
      img: hashtag,
      alt: "Explore",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Explore",
      nav: EXPLORE_PAGE,
    },
    {
      id: "3",
      type: "button",
      img: notification,
      alt: "settings icon",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Notifications",
    },
    {
      id: "4",
      type: "button",
      img: message,
      alt: "Message",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Message",
      nav: MESSAGE_PAGE + user.user.id,
    },
    {
      id: "5",
      type: "button",
      img: bookmark,
      alt: "Bookmarks",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Bookmarks",
      nav: BOOKMARKS_PAGE + user.user.id,
    },
    {
      id: "6",
      type: "button",
      img: profile,
      alt: "Profile",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Profile",
      nav: PROFILE_PAGE_USER + user.user.id,
    },
  ];
  const location = useLocation().pathname;

  return (
    <aside className="menu">
      <Logo class="logo" />
      <nav className="nav">
        {!user.isAuth ? (
          <div>
            <ButtonMenu
              type="button"
              img={hashtag}
              alt="Explore"
              buttonName="Explore"
              classNameButtonImg="button-icon-menu"
              classNameButton={
                location === "/explore"
                  ? "active-button-explore"
                  : "notactive-button-explore"
              }
              nav={EXPLORE_PAGE}
            />
          </div>
        ) : (
          <div>
            {buttons.map((button) => (
              <ButtonMenu
                key={button.id}
                img={button.img}
                id={button.id}
                alt={button.alt}
                classNameButtonImg={button.classNameButtonImg}
                classNameButton={checkActiveButton(button.id)}
                buttonName={button.buttonName}
                nav={button.nav}
              />
            ))}
            <ButtonWriteTwit />
            <UserInfoAndButtonSignOut />
          </div>
        )}
      </nav>
    </aside>
  );
});

export default MenuComponent;
