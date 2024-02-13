import { AUTH_PAGE_PATH } from "../../utils/routs";

import CloseButton from "../../components/buttons/CloseButton";
import LoginForm from "../../components/forms/LoginForm";
import Logo from "../../components/common/Logo";

function LoginPage() {
  return (
    <div className="background-auth-form">
      <div className="form-wrapper wrapper-border">
        <header className="login-form-header">
          <CloseButton nav={AUTH_PAGE_PATH} />
          <Logo class="logo-icon-form" />
        </header>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
