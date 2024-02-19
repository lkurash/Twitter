import MainSectionTrends from "../MainSectionTrends";
import MainSectionWhoToRead from "../MainSectionWhoToRead";
import MainSearchBlock from "../MainSearchBlock";

const PublicHomePage = () => {
  return (
    <div data-testid="public-home-page">
      <MainSearchBlock classNameForm="main-search-form-explore" />

      <MainSectionTrends className="section section-public-page trends" />
      <div className="main-line" />
      <MainSectionWhoToRead className="section section-public-page happen" />
    </div>
  );
};

export default PublicHomePage;
