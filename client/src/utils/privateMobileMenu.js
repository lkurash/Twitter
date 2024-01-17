import hashtag from "../components/Imgs/hashtag_icon.png";
import notification from "../components/Imgs/notification_icon.png";
import logout from "../components/Imgs/logout_icon.png";
import message from "../components/Imgs/message_icon.png";
import {
  EXPLORE_PAGE_PATH,
  LOG_OUT_PAGE_PATH,
  MESSAGE_PAGE_PATH,
  NOTIFICATIONS_PAGE_PATH,
} from "./routs";

export const privateMobileMenu = (user) => {
  const buttons = [
    {
      id: "1",
      type: "button",
      img: hashtag,
      alt: "Explore",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Explore",
      nav: EXPLORE_PAGE_PATH,
    },
    {
      id: "2",
      type: "button",
      img: notification,
      alt: "settings icon",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Notifications",
      nav: NOTIFICATIONS_PAGE_PATH,
    },
    {
      id: "3",
      type: "button",
      img: message,
      alt: "Message",
      classNameButtonImg: "button-icon-menu",
      buttonName: "Message",
      nav: MESSAGE_PAGE_PATH,
    },
    {
      id: "4",
      type: "button",
      img: logout,
      alt: "Log Out",
      classNameButtonImg: "logout-icon-menu",
      buttonName: "Log Out",
      nav: LOG_OUT_PAGE_PATH,
    },
  ];

  return buttons;
};
export default privateMobileMenu;
