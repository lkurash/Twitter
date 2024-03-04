import { useDispatch } from "react-redux";
import {
  setLoginPageVisible,
  setSignUpPageVisible,
} from "../redux/popupElements/popupForm";

const PublicFooter = () => {
  const dispatch = useDispatch();

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
            onClick={() => dispatch(setLoginPageVisible(true))}
          >
            Log in
          </button>
          <button
            data-testid="footer-signup-button"
            className="button-singup"
            onClick={() => dispatch(setSignUpPageVisible(true))}
          >
            Sing up
          </button>
        </div>
      </footer>
    </>
  );
};
export default PublicFooter;
