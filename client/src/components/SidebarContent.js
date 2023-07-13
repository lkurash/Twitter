import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "..";

import { getAllTopics } from "../http/topicsApi";
import MainSearchBlock from "./MainSearchBlock";
import MainSectionTrends from "./MainSectionTrends";
import MainSectionWhoToRead from "./MainSectionWhoToRead";

import "./sideBar.css";

const SidebarContent = observer(() => {
  const { usersStore } = useContext(Context);
  const { topicsStore } = useContext(Context);
  const location = useLocation().pathname;

  useEffect(() => {
    try {
      getAllTopics().then((allTopics) => topicsStore.setTopics(allTopics));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <aside className="side-bar">
      {(usersStore.isAuth || location === "/") && (
        <>
          <MainSearchBlock className="main-search-form-home section-background" />
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
