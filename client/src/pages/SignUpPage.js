import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "..";

import { HOME_PAGE, TWITTER_PAGE } from "../utils/constans";
import SignUpForm from "../components/forms/SignUpForm";
import { register } from "../http/userApi";

import close from "../components/Img/x_icon.png";
import "../components/forms/loginAndRegistretionForm.css";

const SignUpPage = observer(() => {
  const { usersStore } = useContext(Context);
  const navigate = useNavigate();
  const [checkUserInfo, setCheckUserInfo] = useState(false);
  const [registrationUserInfo, setRegistrationUserInfo] = useState({});

  const getRegistrationUserInfo = (userName, email, birthdate, password) => {
    if ((userName && email && birthdate, password)) {
      setCheckUserInfo(true);
      setRegistrationUserInfo({
        userName,
        email,
        password,
        birthdate,
      });
    }
  };
  const signUp = async () => {
    if (checkUserInfo) {
      const newUser = await register(
        registrationUserInfo.userName,
        registrationUserInfo.email,
        registrationUserInfo.password,
        registrationUserInfo.birthdate
      );
      console.log(newUser);
      usersStore.setUser(newUser);
      usersStore.setAuth(true);
      navigate(HOME_PAGE);
    }
  };

  return (
    <div>
      {!checkUserInfo ? (
        <SignUpForm getRegistrationUserInfo={getRegistrationUserInfo} />
      ) : (
        <div className="body">
          <div className="form-wrapper wrapper-border">
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
                <label className="signup-user-name">
                  {registrationUserInfo.userName}
                </label>
              </div>
              <div className="signup-form-input">
                <label className="signup-user-info">Email</label>
                <label className="signup-user-email">
                  {registrationUserInfo.email}
                </label>
              </div>
              <div className="signup-form-input">
                <label className="signup-user-info">Date of birth</label>
                <label className="signup-user-birthdate">
                  {registrationUserInfo.birthdate}
                </label>
              </div>
              <button
                className="signup-form-button"
                type="submit"
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
