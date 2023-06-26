import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "..";
import { getAllTopics } from "../http/topicsApi";
import { PROFILE_PAGE_USER } from "../utils/constans";
import MainSearchBlock from "./MainSearchBlock";
import MainSectionTrends from "./MainSectionTrends";
import MainSectionWhoToRead from "./MainSectionWhoToRead";
import "./sideBar.css";

const SidebarComponent = observer(() => {
  const { user } = useContext(Context);
  const { topics } = useContext(Context);
  const location = useLocation().pathname;

  useEffect(() => {
    try {
      getAllTopics().then((allTopics) => topics.setTopics(allTopics));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <aside className="side-bar">
      {(user.isAuth || location === "/") && (
        <>
          <MainSearchBlock
            className="main-search-form-home section-background"
            page={PROFILE_PAGE_USER}
          />
          <div className="main-content">
            <MainSectionTrends className="section trends-home section-background" />
            <MainSectionWhoToRead className="section happen-home section-background" user={user} />
          </div>
        </>
      )}
    </aside>
  );
});

export default SidebarComponent;
