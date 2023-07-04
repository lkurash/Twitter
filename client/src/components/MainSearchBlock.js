import { useState } from "react";
import { observer } from "mobx-react-lite";
import Logo from "./common/Logo";
import logo from "./Img/logo_icon.png";
import setting from "./Img/settings_icon.png";
import searchIcon from "./Img/zoom__icon.png";
import ButtonSettings from "./common/ButtonSettings";
import ButtonDotMenu from "./common/ButtonDotMenu";
import ListFoundUserSearchBlock from "./ListFoundUserSearchBlock";

const MainSearchBlock = observer((props) => {
  const [userName, setUserName] = useState("");
  const [showListFoundUsers, setShowListFoundUsers] = useState(false);
  const [activeInput, setActiveInput] = useState(false);

  const onClose = () => {
    setShowListFoundUsers(false);
    setActiveInput(false);
  };

  return (
    <div className="main-search-block">
      <Logo path={logo} class="mobile-logo" />
      {activeInput ? (
        <div className={`${props.className} active-search-input`}>
          <img
            src={searchIcon}
            alt="search_icon"
            className="main-search-icon"
          />
          <div className="main-search-form-input">
            <input
              className="main-input"
              placeholder="Search User"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setShowListFoundUsers(true);
              }}
            />
          </div>
          <ListFoundUserSearchBlock
            userName={userName}
            showListFoundUsers={showListFoundUsers}
            onClose={onClose}
            page={props.page}
          />
        </div>
      ) : (
        <div className={props.className}>
          <img
            src={searchIcon}
            alt="search_icon"
            className="main-search-icon"
          />
          <div
            className="main-search-form-input"
            onClick={() => setActiveInput(true)}
          >
            <input
              className="main-input"
              placeholder="Search User"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setShowListFoundUsers(true);
              }}
            />
          </div>
        </div>
      )}
      {/* <ButtonSettings
        path={setting}
        alt="settings icon"
        class="main-settings-icon"
      /> */}
      {/* <div className="mobile-button-main-settings">
        <ButtonDotMenu />
      </div> */}
    </div>
  );
});

export default MainSearchBlock;
