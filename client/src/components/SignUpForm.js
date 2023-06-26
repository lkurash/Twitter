import { useContext, useRef, useState } from "react";
import "./loginAndRegistretionForm.css";
import BirthForm from "./BirthForm";
import ButtonClose from "./common/ButtonClose";
import { Context } from "..";
import { EXPLORE_PAGE } from "../utils/constans";
import useOutsideClick from "../utils/useOutsideClickFunction";
import SignUpFormInput from "./SignUpFormInput";

function SignUpForm({ getInfoUser }) {
  const { user } = useContext(Context);
  const [activeDivName, setActivedivName] = useState(false);
  const [activeDivEmail, setActivedivEmail] = useState(false);
  const [activeDivPassword, setActivedivPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const divRef = useRef(null);

  if (userName.length > 30) {
    setUserName(userName.slice(0, 30));
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
    <div className="body">
      <div className="form-wrapper wrapper-border">
        <header className="login-form-header">
          <ButtonClose nav={EXPLORE_PAGE} />
        </header>
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
            />
          </div>
          <div className="signup-birth">
            <h4>Date of birth</h4>
            <p className="signup-birth-hint">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
          </div>
          <div className="signup-birth-form">
            <BirthForm />
            <button
              className="signup-form-button"
              type="submit"
              onClick={() =>
                getInfoUser(userName, email, user.birthDate, password)
              }
            >
              <span>Next</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SignUpForm;
