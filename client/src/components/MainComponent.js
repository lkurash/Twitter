import { useContext, useEffect } from "react";
import "./main.css";
import { observer } from "mobx-react-lite";
import MainSearchBlock from "./MainSearchBlock";
import MainContent from "./MainContent";
import { Context } from "..";
import { TWITTER_USER_PAGE } from "../utils/constans";

const MainComponent = observer(() => {
  const { user } = useContext(Context);

  return (
    <div className="main-wrapper">
      {!user.isAuth && (
        <main className="main">
          <MainSearchBlock className="main-search-form" page= {TWITTER_USER_PAGE}/>
          <MainContent />
        </main>
      )}
    </div>
  );
});

export default MainComponent;
