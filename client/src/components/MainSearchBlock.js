import { Context } from "..";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import Logo from "./common/Logo";
import ListFoundUserSearchBlock from "./ListFoundUserSearchBlock";

import logo from "./Img/logo_icon.png";
import searchIcon from "./Img/zoom__icon.png";
import userApi from "../http/userApi";

const MainSearchBlock = observer(({ classNameForm }) => {
  const { usersStore } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [listFoundUsersVisible, setListFoundUsersVisible] =
    useState(false);
  const [activeInput, setActiveInput] = useState(false);

  const onClose = () => {
    setListFoundUsersVisible(false);
    setActiveInput(false);
  };

  const searchUsers = (name) => {
    setTimeout(() => {
      userApi.getSearchUsers(name).then((users) => {
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
                  searchUsers(e.target.value);
                } else {
                  searchUsers(null);
                }
                setUserName(e.target.value);
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
