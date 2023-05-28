import { useContext } from "react";
import "./main.css";
import { observer } from "mobx-react-lite";
import MainSearchBlock from "./MainSearchBlock";
import MainContentTwitterPage from "./MainContentTwitterPage";
import { Context } from "..";
import { TWITTER_USER_PAGE } from "../utils/constans";

const MainComponentTwitterPage = observer(() => {
  const { user } = useContext(Context);

  return (
    <div className="main-wrapper">
      {!user.isAuth && (
        <main className="main">
          <MainSearchBlock className="main-search-form" page= {TWITTER_USER_PAGE}/>
          <MainContentTwitterPage />
        </main>
      )}
    </div>
  );
});

export default MainComponentTwitterPage;
