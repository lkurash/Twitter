import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import close from "../components/Img/x_icon.png";
import "../components/loginAndRegistretionForm.css";
import { HOME_PAGE, TWITTER_PAGE } from "../utils/constans";
import SignUpForm from "../components/SignUpForm";
import TwitterPage from "./TwitterPage";
import { Context } from "..";
import { registration } from "../hhtp/userApi";

const SignUpPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [checkUserInfo, setCheckUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userBirthdate: "",
  });

  const getInfoUser = (userName, email, birthdate, password) => {
    if ((userName && email && birthdate, password)) {
      setCheckUserInfo(true);
      setUserInfo({
        userName,
        userEmail: email,
        userPassword: password,
        userBirthdate: birthdate,
      });
    }
  };
  const signUp = async () => {
    if (
      userInfo.userName &&
      userInfo.userEmail &&
      userInfo.userBirthdate &&
      userInfo.userPassword
    ) {
      const data = await registration(
        userInfo.userName,
        userInfo.userEmail,
        userInfo.userPassword,
        userInfo.userBirthdate
      );

      user.setUser(data);

      user.setAuth(true);
      navigate(HOME_PAGE + user.user.id);
    }
  };

  return (
    <div>
      <TwitterPage />
      {!checkUserInfo ? (
        <SignUpForm getInfoUser={getInfoUser} />
      ) : (
        <div className="body">
          <div className="form-wrapper">
            <header className="login-form-header">
              <div
                className="button-close"
                onClick={() => navigate(TWITTER_PAGE)}
              >
                <img src={close} alt="close-icon" className="close-icon" />
              </div>
            </header>
            <main className="signup-form-main">
              <h2>Create your account</h2>
              <div className="signup-form-input">
                <label className="signup-user-info">Name</label>
                <label className="signup-user-name">{userInfo.userName}</label>
              </div>
              <div className="signup-form-input">
                <label className="signup-user-info">Email</label>
                <label className="signup-user-email">
                  {userInfo.userEmail}
                </label>
              </div>
              <div className="signup-form-input">
                <label className="signup-user-info">Date of birth</label>
                <label className="signup-user-birthdate">
                  {userInfo.userBirthdate}
                </label>
              </div>
              <button
                className="signup-form-button"
                type="button"
                onClick={signUp}
              >
                <span>Sign up</span>
              </button>
            </main>
          </div>
        </div>
      )}
    </div>
  );
});

export default SignUpPage;
