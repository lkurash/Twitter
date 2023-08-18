import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "..";

import { EXPLORE_PAGE_PATH } from "../utils/constans";

import MainSearchBlock from "./MainSearchBlock";
import MainSectionTrends from "./MainSectionTrends";
import MainSectionWhoToRead from "./MainSectionWhoToRead";

import "./sideBar.css";
import getFlagIsAuth from "../utils/getFlagIsAuth";

const SidebarContent = observer(() => {
  const { usersStore } = useContext(Context);
  const location = useLocation().pathname;

  const userAuth = getFlagIsAuth();

  return (
    <aside className="side-bar">
      {(userAuth || location === EXPLORE_PAGE_PATH) && (
        <>
          <MainSearchBlock classNameForm="main-search-form-home section-background" />
          <div className="main-content">
            <MainSectionTrends className="section trends-home section-background" />
            <MainSectionWhoToRead
              className="section happen-home section-background"
              user={usersStore}
            />
          </div>
        </>
      )}
    </aside>
  );
});

export default SidebarContent;
