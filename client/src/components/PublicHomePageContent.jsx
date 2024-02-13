import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import spinner from "../utils/spinner";

import MainSectionTrends from "../pages/MainSectionTrends";
import MainSectionWhoToRead from "../pages/MainSectionWhoToRead";
import MainSearchBlock from "../pages/MainSearchBlock";

const PublicHomePageContent = observer(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <>
      <MainSearchBlock classNameForm="main-search-form-explore" />
      {isLoading ? (
        spinner()
      ) : (
        <>
          <MainSectionTrends className="section section-public-page trends" />
          <div className="main-line" />
          <MainSectionWhoToRead className="section section-public-page happen" />
        </>
      )}
    </>
  );
});

export default PublicHomePageContent;
