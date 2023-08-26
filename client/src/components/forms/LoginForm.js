import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../..";

import userApi from "../../http/userApi";

import { PRIVATE_HOME_PAGE_PATH } from "../../utils/constans";

import LocalAuthClient from "../../store/LocalAuthClient";

import LoginPasswordForm from "./LoginPasswordForm";
import LoginEmailForm from "./LoginEmailForm";

const LoginForm = observer(() => {
  const { usersStore } = useContext(Context);
  const navigate = useNavigate();
  const [passwordFieldVisible, setPasswordFieldVisible] = useState(false);
  const [emailFieldVisible, setEmailFieldVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showPasswordField = () => {
    if (email) {
      setPasswordFieldVisible(true);
    }
  };

  const signIn = async () => {
    try {
      if (email && password) {
        const authenticationResult = await userApi.authentication(
          email,
          password
        );

        usersStore.setUser(authenticationResult.user);
        usersStore.setAuth(true);

        LocalAuthClient.setAccessToken(authenticationResult.token);

        return navigate(PRIVATE_HOME_PAGE_PATH);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <>
      {emailFieldVisible && (
        <LoginEmailForm
          email={email}
          setEmail={setEmail}
          showPasswordField={showPasswordField}
          setEmailFieldVisible={setEmailFieldVisible}
        />
      )}

      {passwordFieldVisible && (
        <LoginPasswordForm
          email={email}
          password={password}
          setPassword={setPassword}
          signIn={signIn}
        />
      )}
    </>
  );
});

export default LoginForm;
