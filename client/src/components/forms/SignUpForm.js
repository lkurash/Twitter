import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { Context } from "../..";

import useOutsideClick from "../../utils/useOutsideClickFunction";

import SignUpFormInput from "./SignUpFormInput";
import BirthForm from "./BirthForm";

const SignUpForm = observer(({ setCheckUserInfo }) => {
  const { userStore } = useContext(Context);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const divRef = useRef(null);

  const [activeDivName, setActivedivName] = useState(false);
  const [activeDivEmail, setActivedivEmail] = useState(false);
  const [activeDivPassword, setActivedivPassword] = useState(false);
  const [checkName, setCheckName] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);

  const onClose = () => {
    setActivedivName(false);
    setActivedivEmail(false);
    setActivedivPassword(false);
  };

  const checkUserInfo = () => {
    if (
      userStore.userRegistrationName &&
      userStore.userRegistrationEmail &&
      userStore.userRegistrationPassword &&
      userStore.birthDate
    ) {
      setCheckUserInfo(true);
    } else {
      setCheckName(userStore.userRegistrationName);
      setCheckEmail(userStore.userRegistrationEmail);
      setCheckPassword(userStore.userRegistrationPassword);
    }
  };

  const createRegistrationUserInfo = () => {
    if (userName && email && password && userStore.birthDate) {
      userStore.setUserRegistrationName(userName);
      userStore.setUserRegistrationEmail(email);
      userStore.setUserRegistrationPassword(password);

      checkUserInfo();
    }
  };

  const checkActiveButtonNext = () => {
    if (!userName || !email || !password || !userStore.birthDate) {
      return "signup-form-button";
    } else {
      return "signup-form-button signup-form-button-active";
    }
  };

  useOutsideClick(divRef, onClose);

  return (
    <main className="signup-form-main">
      <h2>Create your account</h2>
      <div ref={divRef}>
        <SignUpFormInput
          placeholder={"Name"}
          value={userName}
          setUserInfo={setUserName}
          activeInput={activeDivName}
          checkUserInfo={checkName}
          length={20}
          onClick={() => {
            setActivedivName(true);
            setActivedivPassword(false);
            setActivedivEmail(false);
            setCheckName(true);
          }}
          name
        />
        <SignUpFormInput
          placeholder={"Email"}
          value={email}
          setUserInfo={setEmail}
          activeInput={activeDivEmail}
          checkUserInfo={checkEmail}
          length={300}
          onClick={() => {
            setActivedivEmail(true);
            setActivedivName(false);
            setActivedivPassword(false);
            setCheckEmail(true);
          }}
          email
        />
        <SignUpFormInput
          placeholder={"Password"}
          value={password}
          setUserInfo={setPassword}
          activeInput={activeDivPassword}
          checkUserInfo={checkPassword}
          length={100}
          onClick={() => {
            setActivedivPassword(true);
            setActivedivEmail(false);
            setActivedivName(false);
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
          className={checkActiveButtonNext()}
          type="submit"
          onClick={createRegistrationUserInfo}
        >
          <span>Next</span>
        </button>
      </div>
    </main>
  );
});

export default SignUpForm;
