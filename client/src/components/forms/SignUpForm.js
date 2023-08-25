import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { Context } from "../..";

import useOutsideClick from "../../utils/useOutsideClickFunction";
import SignUpFormInput from "../SignUpFormInput";
import BirthForm from "./BirthForm";

import "./loginAndRegistretionForm.css";

const SignUpForm = observer(({ setCheckUserInfo }) => {
  const { usersStore } = useContext(Context);

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
      usersStore.userRegistrationName &&
      usersStore.userRegistrationEmail &&
      usersStore.userRegistrationPassword &&
      usersStore.birthDate
    ) {
      setCheckUserInfo(true);
    } else {
      setCheckName(usersStore.userRegistrationName);
      setCheckEmail(usersStore.userRegistrationEmail);
      setCheckPassword(usersStore.userRegistrationPassword);
    }
  };

  const createRegistrationUserInfo = () => {
    if (userName && email && password && usersStore.birthDate) {
      usersStore.setUserRegistrationName(userName);
      usersStore.setUserRegistrationEmail(email);
      usersStore.setUserRegistrationPassword(password);

      checkUserInfo();
    }
  };

  const checkActiveButtonNext = () => {
    if (!userName || !email || !password || !usersStore.birthDate) {
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
          onClick={() => {
            setActivedivEmail(true);
            setActivedivName(false);
            setActivedivPassword(false);
            setCheckEmail(true);
          }}
        />
        <SignUpFormInput
          placeholder={"Password"}
          value={password}
          setUserInfo={setPassword}
          activeInput={activeDivPassword}
          checkUserInfo={checkPassword}
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
