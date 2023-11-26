import spinner from "../../utils/spinner";

const loadPageUserInfo = (isAuth) => {
  return (
    <>
      <div className="main-content-block">
        <div className="main-stiky-panel users-page-stiky-panel">
          <div className="main-search-block-button-return" />
          <div className="main-page-name-user-name load-page">
            <h2 />
            <p />
          </div>
        </div>
        <>
          <div className="main-content-profile-panel">
            <>
              <div className="profile-panel-photo">
                <div className="profile-panel-background-user" />
                <div className="profile-panel-block-photo-button">
                  <div className="profile-panel-photo-user load-page" />
                  {isAuth && (
                    <button
                      type="button"
                      className="button-edit-profile"
                    ></button>
                  )}
                </div>
              </div>
              <div className="load-page-user-name">
                <div className="profile-panel-user-name load-page">
                  <h2 />
                  <p />
                </div>
                <article className="profile-panel-about-user">
                  <p className="about-user-load-page" />
                </article>
                <div className="profile-button-panel-followers load-page">
                  <span className="profile-panel-button-text-followers" />
                  <span className="profile-panel-button-text-followers" />
                </div>
                <div className="profile-panel-info-user">
                  <div className="profile-panel-info-user-web-site load-page">
                    <p />
                  </div>
                  <div className="profile-panel-info-user-birthdate load-page">
                    <p />
                  </div>
                  <div className="profile-panel-info-user-registration load-page">
                    <p />
                  </div>
                </div>
              </div>
            </>
            <>
              <div className="main-content-button-panel">
                <div className="wrapper-button load-page load-page-wrapper-button">
                  <button
                    className="main-content-twits-button-onpanel"
                    type="button"
                  ></button>
                </div>
                <div className="wrapper-button load-page load-page-wrapper-button">
                  <button
                    className="main-content-answers-button-onpanel"
                    type="button"
                  ></button>
                </div>
                <div className="wrapper-button load-page load-page-wrapper-button">
                  <button
                    className="main-content-media-button-onpanel"
                    type="button"
                  ></button>
                </div>
                <div className="wrapper-button load-page load-page-wrapper-button">
                  <button
                    className="main-content-likes-button-onpanel"
                    type="button"
                  ></button>
                </div>
              </div>
              <div className="main-line" />
            </>
            <div className="twits">{spinner()}</div>
          </div>
        </>
      </div>
    </>
  );
};
export default loadPageUserInfo;
