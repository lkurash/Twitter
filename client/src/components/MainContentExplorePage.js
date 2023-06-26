import { observer } from "mobx-react-lite";
import MainSectionTrends from "./MainSectionTrends";
import MainSectionWhoToRead from "./MainSectionWhoToRead";
import MainSearchBlock from "./MainSearchBlock";
import { TWITTER_USER_PAGE } from "../utils/constans";

const MainContentExplorePage = observer(() => {
  return (
    <main className="main-wrapper">
      <div className="main">
        <MainSearchBlock
          className="main-search-form"
          page={TWITTER_USER_PAGE}
        />
        <div className="main-content">
          <MainSectionTrends className="section trends" />
          <div className="main-line" />
          <MainSectionWhoToRead className="section happen" />
        </div>
      </div>
    </main>
  );
});

export default MainContentExplorePage;