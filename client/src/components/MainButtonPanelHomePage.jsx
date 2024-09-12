const MainButtonPanelHomePage = ({ homePage }) => {
  const getClassNameActiveButton = (isActive) =>
    isActive ? "main-button-active" : "main-button-notactive";

  return (
    <div className="main-content-button-panel">
      <div className="wrapper-button">
        <button
          type="button"
          className="main-button-foryou"
          onClick={homePage.handleClickedButtonForYou}
        >
          <span>For you</span>
        </button>
        <div
          className={getClassNameActiveButton(homePage.tweetsForYouVisible)}
        />
      </div>
      <div className="wrapper-button">
        <button
          type="button"
          className="main-button-whoyouread"
          onClick={homePage.handleClickedButtonWhoYouRead}
        >
          <span> You are reading</span>
        </button>
        <div
          className={getClassNameActiveButton(homePage.tweetsWhoReadingVisible)}
        />
      </div>
    </div>
  );
};

export default MainButtonPanelHomePage;
