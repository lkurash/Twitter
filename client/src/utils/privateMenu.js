import hashtag from "../components/Imgs/hashtag_icon.png";
import bookmark from "../components/Imgs/bookmark_icon.png";
import notification from "../components/Imgs/notification_icon.png";
import profile from "../components/Imgs/profile_icon.png";
import home from "../components/Imgs/home_icon.png";
import message from "../components/Imgs/message_icon.png";
import {
  EXPLORE_PAGE_PATH,
  BOOKMARKS_PAGE_PATH,
  MESSAGE_PAGE_PATH,
  NOTIFICATIONS_PAGE_PATH,
  PROFILE_PAGE_USER_PATH,
} from "./routs";

export const privateMenu = (user) => {
  const buttons = [
    {
      id: "1",
      type: "button",
      img: home,
      alt: "Home",
      classNameButtonImg: "home-icon",
      buttonName: "Home",
      nav: `/home`,
    },

    {
      id: "2",
      type: "button",
      img: hashtag,
      alt: "Explore",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Explore",
      nav: EXPLORE_PAGE_PATH,
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
      nav: MESSAGE_PAGE_PATH,
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
      nav: PROFILE_PAGE_USER_PATH,
    },
  ];

  return buttons;
};
export default privateMenu;
