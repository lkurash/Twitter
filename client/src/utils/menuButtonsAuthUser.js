import hashtag from "../components/Img/hashtag_icon.png";
import bookmark from "../components/Img/bookmark_icon.png";
import notification from "../components/Img/notification_icon.png";
import profile from "../components/Img/profile_icon.png";
import home from "../components/Img/home_icon.png";
import message from "../components/Img/message_icon.png";
import {
  AUTHEXPLORE_PAGE_PATH,
  BOOKMARKS_PAGE_PATH,
  PRIVATE_HOME_PAGE_PATH,
  MESSAGE_PAGE_PATH,
  NOTIFICATIONS_PAGE_PATH,
  PROFILE_PAGE_USERS_PATH,
} from "./constans";
import getAuthUserID from "./getAuthUserID";

export const menuButtonsAuthUser = (user) => {
  const authUserID = getAuthUserID();
  const buttons = [
    {
      id: "1",
      type: "button",
      img: home,
      alt: "Home",
      classNameButtonImg: "home-icon",
      buttonName: "Home",
      nav: PRIVATE_HOME_PAGE_PATH,
    },

    {
      id: "2",
      type: "button",
      img: hashtag,
      alt: "Explore",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Explore",
      nav: AUTHEXPLORE_PAGE_PATH,
    },
    {
      id: "3",
      type: "button",
      img: notification,
      alt: "settings icon",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Notifications",
      nav: NOTIFICATIONS_PAGE_PATH,
    },
    {
      id: "4",
      type: "button",
      img: message,
      alt: "Message",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Message",
      nav: MESSAGE_PAGE_PATH + authUserID,
    },
    {
      id: "5",
      type: "button",
      img: bookmark,
      alt: "Bookmarks",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Bookmarks",
      nav: BOOKMARKS_PAGE_PATH,
    },
    {
      id: "6",
      type: "button",
      img: profile,
      alt: "Profile",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Profile",
      nav: PROFILE_PAGE_USERS_PATH + authUserID,
    },
  ];

  return buttons;
};
export default menuButtonsAuthUser;
