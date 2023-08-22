import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../..";

import { PRIVATE_HOME_PAGE_PATH } from "../../utils/constans";
import SignUpForm from "../../components/forms/SignUpForm";
import userApi from "../../http/userApi";

import "../../components/forms/loginAndRegistretionForm.css";
import LocalAuthClient from "../../store/LocalAuthClient";

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
      const registerResult = await userApi.register(
        registrationUserInfo.userName,
        registrationUserInfo.email,
        registrationUserInfo.password,
        registrationUserInfo.birthdate
      );

      usersStore.setUser(registerResult.user);
      usersStore.setAuth(true);

      LocalAuthClient.setAccessToken(registerResult.token);

      navigate(PRIVATE_HOME_PAGE_PATH);
    }
  };

  return (
    <>
      {!checkUserInfo ? (
        <SignUpForm getRegistrationUserInfo={getRegistrationUserInfo} />
      ) : (
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
          <button className="signup-form-button" type="submit" onClick={signUp}>
            <span>Sign up</span>
          </button>
        </main>
      )}
    </>
  );
});

export default SignUpPage;
