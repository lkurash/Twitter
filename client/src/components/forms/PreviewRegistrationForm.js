import { Context } from "../..";

import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";

import LocalAuthClient from "../../store/LocalAuthClient";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import spinner from "../../utils/spinner";
import { userActions } from "../../redux/user/user.actions";
import getFlagIsAuth from "../../utils/getFlagIsAuth";

const PreviewRegistrationForm = observer(({ checkUserInfo }) => {
  const dispatch = useDispatch();
  const { token } = useSelector(auth);

   const { visiblePopUpStore } = useContext(Context);
  const { userStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(true);

  const signUp = async () => {
    if (checkUserInfo) {
      dispatch(
        userActions.register(
          userStore.userRegistrationName,
          userStore.userRegistrationEmail,
          userStore.userRegistrationPassword,
          userStore.birthDate
        )
      );

      setPreviewVisible(false);

      return setIsLoading(true);
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
    <main className="signup-form-main">
      {previewVisible && (
        <>
          <h2>Create your account</h2>

          <div className="signup-form-input">
            <p className="signup-user-info">Name</p>
            <p className="signup-user-name">{userStore.userRegistrationName}</p>
          </div>

          <div className="signup-form-input">
            <p className="signup-user-info">Email</p>
            <p className="signup-user-email">
              {userStore.userRegistrationEmail}
            </p>
          </div>

          <div className="signup-form-input">
            <p className="signup-user-info">Date of birth</p>
            <p className="signup-user-birthdate">{userStore.birthDate}</p>
          </div>

          <button
            className="signup-form-button signup-form-button-active"
            type="submit"
            onClick={signUp}
          >
            <span>Sign up</span>
          </button>
        </>
      )}
    </main>
  );
});

export default PreviewRegistrationForm;
