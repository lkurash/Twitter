import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LocalAuthClient from "../../store/LocalAuthClient";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/user/user.actions";
import { auth } from "../../redux/user/user.selectors";

import spinner from "../../utils/spinner";
import { Context } from "../..";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import { HOME_PAGE_PATH } from "../../utils/routs";

import LoginPasswordForm from "./LoginPasswordForm";
import LoginEmailForm from "./LoginEmailForm";

const LoginForm = observer(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const { visiblePopUpStore } = useContext(Context);
  const { infoMessageStore } = useContext(Context);
  const { token, error } = useSelector(auth);

  const [isLoading, setIsLoading] = useState(false);
  const [passwordFieldVisible, setPasswordFieldVisible] = useState(false);
  const [emailFieldVisible, setEmailFieldVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showPasswordField = () => {
    if (email) {
      setPasswordFieldVisible(true);
    }
  };

  const signIn = () => {
    if (email && password) {
      dispatch(userActions.authentication(email, password));

      setPasswordFieldVisible(false);
      setEmailFieldVisible(false);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (token) {
      LocalAuthClient.setAccessToken(token);
      LocalAuthClient.setCookiesTweets(false);
      if (!location.includes("user")) {
        navigate(HOME_PAGE_PATH);
      }
      setTimeout(() => {
        dispatch(userActions.getAuth(getFlagIsAuth()));
        visiblePopUpStore.setLoginPageVisible(false);
        setIsLoading(false);
      }, 500);
    }
    if (error) {
      setIsLoading(false);
      infoMessageStore.setTextErrorMessage(error);
      infoMessageStore.setErrorVisible(true);
      if (error.includes("password")) {
        setPasswordFieldVisible(true);
      } else {
        setEmailFieldVisible(true);
      }
    }
  }, [token, error]);

  if (isLoading) {
    return <div className="load-login">{spinner()}</div>;
  }

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
