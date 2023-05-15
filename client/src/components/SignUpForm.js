import { useState } from "react";
import "./loginAndRegistretionForm.css";
import BirthForm from "./BirthForm";
import ButtonClose from "./common/ButtonClose";

function SignUpForm(props) {
  const [activeDivName, setActivedivName] = useState(false);
  const [activeDivEmail, setActivedivEmail] = useState(false);
  const [activeDivPssword, setActivedivPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (userName.length > 30) {
    setUserName(userName.slice(0, 30));
  }
  if (email.length > 30) {
    setEmail(email.slice(0, 30));
  }
  if (password.length > 30) {
    setPassword(password.slice(0, 30));
  }

  return (
    <div className="body">
      <div className="form-wrapper">
        <header className="login-form-header">
          <ButtonClose />
        </header>
        <main className="signup-form-main">
          <h2>Create your account</h2>
          {!activeDivName ? (
            <div
              className="signup-form-input"
              onClick={() => setActivedivName(true)}
            >
              <label className="signup-notactive-input">Name</label>
            </div>
          ) : (
            <div className="signup-form-input active">
              <label className="signup-active-input">Name</label>
              <input
                type="text"
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <p className="signup-form-input-help">Min length 1 max 30</p>
            </div>
          )}
          {!activeDivEmail ? (
            <div
              className="signup-form-input"
              onClick={() => setActivedivEmail(true)}
            >
              <label className="signup-notactive-input">Email</label>
            </div>
          ) : (
            <div className="signup-form-input active">
              <label className="signup-active-input">Email</label>
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="signup-form-input-help">Min length 1 max 30</p>
            </div>
          )}
          {!activeDivPssword ? (
            <div
              className="signup-form-input"
              onClick={() => setActivedivPassword(true)}
            >
              <label className="signup-notactive-input">Password</label>
            </div>
          ) : (
            <div className="signup-form-input active">
              <label className="signup-active-input">Password</label>
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="signup-form-input-help">Min length 1 max 30</p>
            </div>
          )}

          <div className="signup-birth">
            <h4>Date of birth</h4>
            <p className="signup-birth-hint">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
          </div>
          <BirthForm
            getInfoUser={props.getInfoUser}
            userName={userName}
            email={email}
            password={password}
          />
        </main>
      </div>
    </div>
  );
}

export default SignUpForm;
