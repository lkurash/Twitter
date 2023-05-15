import { useContext, useEffect } from "react";
import "./main.css";
import { observer } from "mobx-react-lite";
import MainSearchBlock from "./MainSearchBlock";
import MainContent from "./MainContent";
import { Context } from "..";

const MainComponent = observer(() => {
  const { user } = useContext(Context);

  return (
    <div className="main-wrapper">
      {!user.isAuth && (
        <main className="main">
          <MainSearchBlock className="main-search-form" />
          <MainContent />
        </main>
      )}
    </div>
  );
});

export default MainComponent;
