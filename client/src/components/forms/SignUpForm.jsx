import { useRef, useState } from "react";

import useOutsideClick from "../../utils/useOutsideClickFunction";

import { useDispatch, useSelector } from "react-redux";
import { visibilityUserInfo } from "../../redux/user/visibilityUserInfo/userInfo.selector";
import {
  setUserRegistrationEmail,
  setUserRegistrationName,
  setUserRegistrationPassword,
} from "../../redux/user/visibilityUserInfo/visibilityUserInfo";
import { checkRegistrationEmail } from "../../utils/checkRegistrationEmail";

import SignUpFormInput from "./SignUpFormInput";
import BirthForm from "./BirthForm";

const SignUpForm = ({ setCheckUserInfo }) => {
  const dispatch = useDispatch();
  const userInfoState = useSelector(visibilityUserInfo);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const divRef = useRef(null);

  const [activeInputName, setActiveInputName] = useState(false);
  const [activeInputEmail, setActiveInputEmail] = useState(false);
  const [activeInputPassword, setActiveInputPassword] = useState(false);
  const [checkName, setCheckName] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);

  const unActiveInput = () => {
    setActiveInputName(false);
    setActiveInputEmail(false);
    setActiveInputPassword(false);
  };

  const checkUserInfo = () => {
    if (
      userName &&
      password &&
      checkRegistrationEmail(email) &&
      userInfoState.birthDate
    ) {
      setCheckUserInfo(true);
      return true;
    } else {
      setCheckName(userName);
      setCheckEmail(checkRegistrationEmail(email));
      setCheckPassword(password);
      return false;
    }
  };

  const createRegistrationUserInfo = () => {
    if (userName && email && password && userInfoState.birthDate) {
      if (checkUserInfo()) {
        dispatch(setUserRegistrationName(userName));
        dispatch(setUserRegistrationEmail(email));
        dispatch(setUserRegistrationPassword(password));
      }
    }
  };

  const checkActiveButtonNext = () => {
    if (!userName || !email || !password || !userInfoState.birthDate) {
      return "signup-form-button";
    } else {
      return "signup-form-button signup-form-button-active";
    }
  };

  useOutsideClick(divRef, unActiveInput);

  return (
    <main className="signup-form-main">
      <h2>Create your account</h2>
      <div ref={divRef}>
        <SignUpFormInput
          name="userName"
          placeholder={"Name"}
          value={userName}
          setUserInfo={setUserName}
          activeInput={activeInputName}
          checkUserInfo={checkName}
          length={20}
          onClick={() => {
            setActiveInputName(true);
            setActiveInputPassword(false);
            setActiveInputEmail(false);
            setCheckName(true);
          }}
          userName
        />
        <SignUpFormInput
          name="email"
          placeholder={"Email"}
          value={email}
          setUserInfo={setEmail}
          activeInput={activeInputEmail}
          checkUserInfo={checkEmail}
          length={300}
          onClick={() => {
            setActiveInputEmail(true);
            setActiveInputName(false);
            setActiveInputPassword(false);
            setCheckEmail(true);
          }}
          email
        />
        <SignUpFormInput
          name="password"
          placeholder={"Password"}
          value={password}
          setUserInfo={setPassword}
          activeInput={activeInputPassword}
          checkUserInfo={checkPassword}
          length={100}
          onClick={() => {
            setActiveInputPassword(true);
            setActiveInputEmail(false);
            setActiveInputName(false);
            setCheckPassword(true);
          }}
          password
        />
      </div>
      <div className="signup-birth">
        <h4>Date of birth</h4>
        <p className="signup-birth-hint">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </p>
      </div>
      <div className="signup-birth-form">
        <BirthForm />
        <button
          name="next"
          className={checkActiveButtonNext()}
          type="submit"
          onClick={createRegistrationUserInfo}
        >
          <span>Next</span>
        </button>
      </div>
    </main>
  );
};

export default SignUpForm;
