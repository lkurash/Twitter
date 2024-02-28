import { useDispatch } from "react-redux";
import { useState } from "react";
import { userOptionsActions } from "../redux/user/userOptions/userOptions.actions";

import Logo from "../components/common/Logo";
import ListFoundUserSearchBlock from "../components/ListFoundUserSearchBlock";

import logo from "../components/Imgs/logo_icon.png";
import searchIcon from "../components/Imgs/zoom__icon.png";

const MainSearchBlock = ({ classNameForm }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [listFoundUsersVisible, setListFoundUsersVisible] = useState(false);
  const [activeInput, setActiveInput] = useState(false);

  const onClose = () => {
    setListFoundUsersVisible(false);
    setActiveInput(false);
  };

  const searchUsers = (name) => {
    setListFoundUsersVisible(false);
    dispatch(userOptionsActions.getSearchedUsers(name));
    setTimeout(() => {
      setListFoundUsersVisible(true);
    }, 500);
  };

  return (
    <div className="main-search-block">
      <Logo path={logo} className="mobile-logo" />
      <div
        className={
          activeInput ? `${classNameForm} active-search-input` : classNameForm
        }
        data-testid={
          activeInput ? "active-search-input" : "notactive-search-input"
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
              data-testid="input-search"
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
              }}
            />
          </div>
        </div>
        {listFoundUsersVisible && (
          <ListFoundUserSearchBlock
            userName={userName}
            setUserName={setUserName}
            listFoundUsersVisible={listFoundUsersVisible}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default MainSearchBlock;
