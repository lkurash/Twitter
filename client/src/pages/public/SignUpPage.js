import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../..";

import LocalAuthClient from "../../store/LocalAuthClient";

import userClient from "../../http/userClient";

import { HOME_PAGE_PATH } from "../../utils/constans";

import SignUpForm from "../../components/forms/SignUpForm";

import "../../components/forms/loginAndRegistretionForm.css";
const SignUpPage = observer(() => {
  const { usersStore } = useContext(Context);
  const navigate = useNavigate();
  const [checkUserInfo, setCheckUserInfo] = useState(false);

  const signUp = async () => {
    if (checkUserInfo) {
      const registerResult = await userClient.register(
        usersStore.userRegistrationName,
        usersStore.userRegistrationEmail,
        usersStore.userRegistrationPassword,
        usersStore.birthDate
      );

      usersStore.setUser(registerResult.user);
      usersStore.setAuth(true);
      usersStore.setBirthDate("");

      LocalAuthClient.setAccessToken(registerResult.token);

      navigate(HOME_PAGE_PATH);
    }
  };

  return (
    <>
      {!checkUserInfo ? (
        <SignUpForm setCheckUserInfo={setCheckUserInfo} />
      ) : (
        <main className="signup-form-main">
          <h2>Create your account</h2>
          <div className="signup-form-input">
            <label className="signup-user-info">Name</label>
            <label className="signup-user-name">
              {usersStore.userRegistrationName}
            </label>
          </div>
          <div className="signup-form-input">
            <label className="signup-user-info">Email</label>
            <label className="signup-user-email">
              {usersStore.userRegistrationEmail}
            </label>
          </div>
          <div className="signup-form-input">
            <label className="signup-user-info">Date of birth</label>
            <label className="signup-user-birthdate">
              {usersStore.birthDate}
            </label>
          </div>
          <button
            className="signup-form-button signup-form-button-active"
            type="submit"
            onClick={signUp}
          >
            <span>Sign up</span>
          </button>
        </main>
      )}
    </>
  );
});

export default SignUpPage;
