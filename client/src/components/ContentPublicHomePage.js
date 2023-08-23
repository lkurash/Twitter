import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import MainSectionTrends from "./MainSectionTrends";
import MainSectionWhoToRead from "./MainSectionWhoToRead";
import MainSearchBlock from "./MainSearchBlock";

import spinner from "../utils/spinner";

const ContentPublicHomePage = observer(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <main className="main-wrapper">
      <div className="main">
        <MainSearchBlock classNameForm="main-search-form-explore" />
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

export default ContentPublicHomePage;
