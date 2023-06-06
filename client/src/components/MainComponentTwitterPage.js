import { useContext } from "react";
import "./main.css";
import { observer } from "mobx-react-lite";
import MainSearchBlock from "./MainSearchBlock";
import MainContentTwitterPage from "./MainContentTwitterPage";
import { Context } from "..";
import { TWITTER_USER_PAGE } from "../utils/constans";
import TwitsForYou from "./TwitsForYou";

const MainComponentTwitterPage = observer(() => {
  const { user } = useContext(Context);

  return (
    <main className="main-wrapper">
      {!user.isAuth ? (
        <div className="main">
          <MainSearchBlock
            className="main-search-form"
            page={TWITTER_USER_PAGE}
          />
          <MainContentTwitterPage />
        </div>
      ) : (
        <div className="main">
          <div className="user-main-content">
            <div className="user-main-content-block">
              <div className="page-name">
                <div className="page-name-user-name">
                  <h2>Twitter</h2>
                </div>
              </div>
              <div className="main-line" />
              <TwitsForYou showTwitsForYou="true" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
});

export default MainComponentTwitterPage;
