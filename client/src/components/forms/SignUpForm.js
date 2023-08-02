import { useContext, useRef, useState } from "react";
import { Context } from "../..";

import useOutsideClick from "../../utils/useOutsideClickFunction";
import SignUpFormInput from "../SignUpFormInput";
import BirthForm from "./BirthForm";

import "./loginAndRegistretionForm.css";

function SignUpForm({ getRegistrationUserInfo }) {
  const { usersStore } = useContext(Context);
  const [activeDivName, setActivedivName] = useState(false);
  const [activeDivEmail, setActivedivEmail] = useState(false);
  const [activeDivPassword, setActivedivPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const divRef = useRef(null);

  if (userName.length > 20) {
    setUserName(userName.slice(0, 20));
  }
  if (email.length > 30) {
    setEmail(email.slice(0, 30));
  }
  if (password.length > 30) {
    setPassword(password.slice(0, 30));
  }

  const onClose = () => {
    setActivedivName(false);
    setActivedivEmail(false);
    setActivedivPassword(false);
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
          onClick={() => {
            setActivedivName(true);
            setActivedivPassword(false);
            setActivedivEmail(false);
          }}
          name
        />
        <SignUpFormInput
          placeholder={"Email"}
          value={email}
          setUserInfo={setEmail}
          activeInput={activeDivEmail}
          onClick={() => {
            setActivedivEmail(true);
            setActivedivName(false);
            setActivedivPassword(false);
          }}
        />
        <SignUpFormInput
          placeholder={"Password"}
          value={password}
          setUserInfo={setPassword}
          activeInput={activeDivPassword}
          onClick={() => {
            setActivedivPassword(true);
            setActivedivEmail(false);
            setActivedivName(false);
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
          className="signup-form-button"
          type="submit"
          onClick={() =>
            getRegistrationUserInfo(
              userName,
              email,
              usersStore.birthDate,
              password
            )
          }
        >
          <span>Next</span>
        </button>
      </div>
    </main>
  );
}

export default SignUpForm;
