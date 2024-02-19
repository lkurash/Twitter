import { useContext } from "react";

import { observer } from "mobx-react-lite";
import { Context } from "../Context";

const PublicFooter = observer(() => {
  const { visiblePopUpStore } = useContext(Context);

  return (
    <>
      <footer className="footer">
        <div className="footer-desc">
          <h4>Don’t miss what’s happening</h4>
          <p>People on Twitter are the first to know.</p>
        </div>
        <div className="footer-buttons">
          <button
            className="button-login"
            data-testid="footer-login-button"
            onClick={() => visiblePopUpStore.setLoginPageVisible(true)}
          >
            Log in
          </button>
          <button
            data-testid="footer-signup-button"
            className="button-singup"
            onClick={() => visiblePopUpStore.setSignPageUpVisible(true)}
          >
            Sing up
          </button>
        </div>
      </footer>
    </>
  );
});
export default PublicFooter;
