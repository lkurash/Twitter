import { observer } from "mobx-react-lite";
import MainSectionTrends from "./MainSectionTrends";
import MainSectionWhoToRead from "./MainSectionWhoToRead";
import MainSearchBlock from "./MainSearchBlock";
import { TWITTER_USER_PAGE } from "../utils/constans";
import { useEffect, useState } from "react";
import spinner from "../utils/spinner";

const MainContentExplorePage = observer(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <main className="main-wrapper">
      <div className="main">
        <MainSearchBlock
          className="main-search-form"
          page={TWITTER_USER_PAGE}
        />
        {isLoading ? (
          spinner()
        ) : (
          <div className="main-content">
            <MainSectionTrends className="section trends" />
            <div className="main-line" />
            <MainSectionWhoToRead className="section happen" />
          </div>
        )}
      </div>
    </main>
  );
});

export default MainContentExplorePage;
