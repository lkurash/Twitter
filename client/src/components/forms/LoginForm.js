import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";

import LocalAuthClient from "../../store/LocalAuthClient";

import LoginPasswordForm from "./LoginPasswordForm";
import LoginEmailForm from "./LoginEmailForm";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/user/user.actions";
import { auth } from "../../redux/user/user.selectors";
import spinner from "../../utils/spinner";
import { Context } from "../..";
import getFlagIsAuth from "../../utils/getFlagIsAuth";

const LoginForm = observer(() => {
  const { visiblePopUpStore } = useContext(Context);
  const { token } = useSelector(auth);
  const dispatch = useDispatch();

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
      setTimeout(() => {
        setIsLoading(false);
        dispatch(userActions.getAuth(getFlagIsAuth()));
        visiblePopUpStore.setLoginPageVisible(false);
      }, 500);
    }
  }, [token]);

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
