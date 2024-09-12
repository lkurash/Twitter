import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { userActions } from "../../redux/user/user.actions";
import { setSignUpPageVisible } from "../../redux/popupElements/popupForm";
import { visibilityUserInfo } from "../../redux/user/visibilityUserInfo/userInfo.selector";

import LocalAuthClient from "../../store/LocalAuthClient";

import spinner from "../../utils/spinner";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import { HOME_PAGE_PATH } from "../../utils/routs";

const PreviewRegistrationForm = ({ checkUserInfo }) => {
  const dispatch = useDispatch();
  const { token } = useSelector(auth);
  const userInfoState = useSelector(visibilityUserInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(true);
  const navigate = useNavigate();

  const signUp = async () => {
    if (checkUserInfo) {
      dispatch(
        userActions.register(
          userInfoState.userRegistrationName,
          userInfoState.userRegistrationEmail,
          userInfoState.userRegistrationPassword,
          userInfoState.birthDate
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
        dispatch(setSignUpPageVisible(false));
        navigate(HOME_PAGE_PATH);
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
            <p className="signup-user-name">
              {userInfoState.userRegistrationName}
            </p>
          </div>

          <div className="signup-form-input">
            <p className="signup-user-info">Email</p>
            <p className="signup-user-email">
              {userInfoState.userRegistrationEmail}
            </p>
          </div>

          <div className="signup-form-input">
            <p className="signup-user-info">Date of birth</p>
            <p className="signup-user-birthdate">{userInfoState.birthDate}</p>
          </div>

          <button
            name="signUp"
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
};

export default PreviewRegistrationForm;
