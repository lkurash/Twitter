import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../..";

import { EXPLORE_PAGE, HOME_PAGE } from "../../utils/constans";
import { authentication } from "../../http/userApi";
import ButtonClose from "../buttons/ButtonClose";
import LoginPasswordForm from "./LoginPasswordForm";
import LoginEmailForm from "./LoginEmailForm";
import Logo from "../common/Logo";

import "./loginAndRegistretionForm.css";

const LoginForm = observer(() => {
  const { usersStore } = useContext(Context);
  const navigate = useNavigate();
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [showFormEmail, setShowFormEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation().pathname;

  const showPasswordForm = () => {
    if (email) {
      setShowFormPassword({ showFormPassword: true });
    }
  };

  const signIn = async () => {
    try {
      if (email && password) {
        const userProfile = await authentication(email, password);

        usersStore.setUser(userProfile);
        usersStore.setAuth(true);
        return navigate(HOME_PAGE);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const signInKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      signIn();
    }
  };

  return (
    <div className="body">
      <div className="form-wrapper wrapper-border">
        <header className="login-form-header">
          <ButtonClose nav={location === "/auth/login" ? EXPLORE_PAGE : -1} />
          <Logo class="logo-icon-form" />
        </header>
        <LoginEmailForm
          email={email}
          setEmail={setEmail}
          showPasswordForm={showPasswordForm}
          showFormEmail={showFormEmail}
          setShowFormEmail={setShowFormEmail}
        />

        <LoginPasswordForm
          email={email}
          password={password}
          showFormPassword={showFormPassword}
          setPassword={setPassword}
          signInKeyDown={signInKeyDown}
          signIn={signIn}
        />
      </div>
    </div>
  );
});

export default LoginForm;
