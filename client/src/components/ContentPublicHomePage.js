import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import spinner from "../utils/spinner";

import MainSectionTrends from "./MainSectionTrends";
import MainSectionWhoToRead from "./MainSectionWhoToRead";
import MainSearchBlock from "./MainSearchBlock";

const ContentPublicHomePage = observer(() => {
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

export default ContentPublicHomePage;
