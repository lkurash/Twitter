import "./footer.css";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE, SIGNUP_PAGE } from "../utils/constans";

function FooterComponent() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-desc">
        <h4>Don’t miss what’s happening</h4>
        <p>People on Twitter are the first to know.</p>
      </div>
      <div className="footer-buttons">
        <button
          className="button-login"
          type="button"
          onClick={() => navigate(LOGIN_PAGE)}
        >
          Log in{" "}
        </button>
        <button
          className="button-singup"
          type="button"
          onClick={() => navigate(SIGNUP_PAGE)}
        >
          Sing up
        </button>
      </div>
    </footer>
  );
}
export default FooterComponent;
