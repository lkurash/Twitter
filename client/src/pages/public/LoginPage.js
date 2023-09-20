import ButtonClose from "../../components/buttons/ButtonClose";
import LoginForm from "../../components/forms/LoginForm";
import { AUTH_PAGE_PATH } from "../../utils/constans";
import Logo from "../../components/common/Logo";

function LoginPage() {
  return (
    <div className="background-auth-form">
      <div className="form-wrapper wrapper-border">
        <header className="login-form-header">
          <ButtonClose nav={AUTH_PAGE_PATH} />
          <Logo class="logo-icon-form" />
        </header>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
