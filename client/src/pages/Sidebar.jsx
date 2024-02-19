import { useLocation } from "react-router-dom";
import MainSearchBlock from "./MainSearchBlock";
import MainSectionTrends from "./MainSectionTrends";
import MainSectionWhoToRead from "./MainSectionWhoToRead";
import { ROOT_PAGE_PATH } from "../utils/routs";

const Sidebar = () => {
  const location = useLocation().pathname;
  return (
    <aside className="side-bar">
      {location !== ROOT_PAGE_PATH && (
        <MainSearchBlock classNameForm="main-search-form-home section-background" />
      )}
      <MainSectionTrends className="section trends-sidebar section-background" />
      <MainSectionWhoToRead className="section happen-sidebar section-background" />
    </aside>
  );
};

export default Sidebar;
