import { useState } from "react";
import { observer } from "mobx-react-lite";

import Logo from "./common/Logo";
import ListFoundUserSearchBlock from "./ListFoundUserSearchBlock";

import logo from "./Img/logo_icon.png";
import searchIcon from "./Img/zoom__icon.png";

const MainSearchBlock = observer(({ classNameForm }) => {
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
      <div
        className={
          activeInput ? `${classNameForm} active-search-input` : classNameForm
        }
      >
        <div className="main-search-form">
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
              onClick={() => {
                setShowListFoundUsers(true);
                setActiveInput(true);
              }}
              onChange={(e) => {
                setUserName(e.target.value);
                setShowListFoundUsers(true);
              }}
            />
          </div>
        </div>
        <ListFoundUserSearchBlock
          userName={userName}
          showListFoundUsers={showListFoundUsers}
          onClose={onClose}
        />
      </div>
    </div>
  );
});

export default MainSearchBlock;
