import { useContext } from "react";

import { observer } from "mobx-react-lite";
import { Context } from "..";

const FooterComponent = observer(() => {
  const { visiblePopUpStore } = useContext(Context);

  return (
    <>
      <footer className="footer">
        <div className="footer-desc">
          <h4>Don’t miss what’s happening</h4>
          <p>People on Tweetter are the first to know.</p>
        </div>
        <div className="footer-buttons">
          <button
            className="button-login"
            onClick={() => visiblePopUpStore.setLoginPageVisible(true)}
          >
            Log in
          </button>
          <button
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
export default FooterComponent;
