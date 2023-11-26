import { observer } from "mobx-react-lite";

import MainSearchBlock from "./MainSearchBlock";
import MainSectionTrends from "./MainSectionTrends";
import MainSectionWhoToRead from "./MainSectionWhoToRead";

const SidebarContent = observer(() => {
  return (
    <aside className="side-bar">
      <>
        <MainSearchBlock classNameForm="main-search-form-home section-background" />
        <div className="main-content">
          <MainSectionTrends className="section trends-home section-background" />
          <MainSectionWhoToRead className="section happen-home section-background" />
        </div>
      </>
    </aside>
  );
});

export default SidebarContent;
