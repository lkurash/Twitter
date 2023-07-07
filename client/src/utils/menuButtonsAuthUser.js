import hashtag from "../components/Img/hashtag_icon.png";
import bookmark from "../components/Img/bookmark_icon.png";
import notification from "../components/Img/notification_icon.png";
import profile from "../components/Img/profile_icon.png";
import home from "../components/Img/home_icon.png";
import message from "../components/Img/message_icon.png";
import {
  BOOKMARKS_PAGE,
  EXPLORE_PAGE,
  HOME_PAGE,
  MESSAGE_PAGE,
  PROFILE_PAGE_USER,
} from "./constans";

export const menuButtonsAuthUser = (user) => {
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

  return buttons;
};
export default menuButtonsAuthUser;
