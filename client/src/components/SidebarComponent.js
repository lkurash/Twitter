import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { PROFILE_PAGE_USER } from "../utils/constans";
import MainContent from "./MainContent";
import MainSearchBlock from "./MainSearchBlock";
import "./sideBar.css";

const SidebarComponent = observer(() => {
  const { user } = useContext(Context);

  return (
    <aside className="side-bar">
      {user.user.id && (
        <>
          <MainSearchBlock className="main-search-form-home" page={PROFILE_PAGE_USER}/>
          <MainContent />
        </>
      )}
    </aside>
  );
});

export default SidebarComponent;
