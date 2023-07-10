import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "..";
import Logo from "./common/Logo";
import "./loginAndRegistretionForm.css";
import { EXPLORE_PAGE, HOME_PAGE } from "../utils/constans";
import { authorization, getUserInfo } from "../http/userApi";
import ButtonClose from "./common/ButtonClose";
import LoginPasswordForm from "./LoginPasswordForm";
import LoginEmailForm from "./LoginEmailForm";

const LoginForm = observer(() => {
  const { user } = useContext(Context);
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
        const userLogin = await authorization(email, password);
        const userInfo = await getUserInfo();

        user.setUser(userInfo);

        user.setAuth(true);
        navigate(HOME_PAGE);
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
