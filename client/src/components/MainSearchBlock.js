import { Context } from "..";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import userClient from "../http/userClient";

import Logo from "./common/Logo";
import ListFoundUserSearchBlock from "./ListFoundUserSearchBlock";

import logo from "./Img/logo_icon.png";
import searchIcon from "./Img/zoom__icon.png";

const MainSearchBlock = observer(({ classNameForm }) => {
  const { usersStore } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [listFoundUsersVisible, setListFoundUsersVisible] = useState(false);
  const [activeInput, setActiveInput] = useState(false);

  const onClose = () => {
    setListFoundUsersVisible(false);
    setActiveInput(false);
  };

  const searchUsers = (name) => {
    setTimeout(() => {
      userClient.getSearchUsers(name).then((users) => {
        usersStore.setFoundUsers(users);
      });
    }, 500);
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
              name="searchFormInput"
              className="main-input"
              placeholder="Search User"
              value={userName}
              onClick={() => {
                setActiveInput(true);
                if (userName) {
                  setListFoundUsersVisible(true);
                }
              }}
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  searchUsers(e.target.value.slice(0, 20));
                } else {
                  searchUsers(null);
                }
                setUserName(e.target.value.slice(0, 20));
                setListFoundUsersVisible(true);
              }}
            />
          </div>
        </div>
        {listFoundUsersVisible && (
          <ListFoundUserSearchBlock
            userName={userName}
            listFoundUsersVisible={listFoundUsersVisible}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
});

export default MainSearchBlock;
