import { Context } from "../..";

import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import userClient from "../../http/userClient";
import { HOME_PAGE_PATH } from "../../utils/constans";
import LocalAuthClient from "../../store/LocalAuthClient";

const PreviewRegistrationForm = observer(({ checkUserInfo }) => {
  const { usersStore } = useContext(Context);
  const navigate = useNavigate();

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
    <main className="signup-form-main">
      <h2>Create your account</h2>
      
      <div className="signup-form-input">
        <p className="signup-user-info">Name</p>
        <p className="signup-user-name">{usersStore.userRegistrationName}</p>
      </div>

      <div className="signup-form-input">
        <p className="signup-user-info">Email</p>
        <p className="signup-user-email">{usersStore.userRegistrationEmail}</p>
      </div>

      <div className="signup-form-input">
        <p className="signup-user-info">Date of birth</p>
        <p className="signup-user-birthdate">{usersStore.birthDate}</p>
      </div>

      <button
        className="signup-form-button signup-form-button-active"
        type="submit"
        onClick={signUp}
      >
        <span>Sign up</span>
      </button>
    </main>
  );
});

export default PreviewRegistrationForm;
