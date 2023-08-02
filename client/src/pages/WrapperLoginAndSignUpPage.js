import { Outlet, useLocation } from "react-router-dom";
import ButtonClose from "../components/buttons/ButtonClose";
import Logo from "../components/common/Logo";
import { EXPLORE_PAGE } from "../utils/constans";

export default function WrapperLoginAndSignUpPage() {
  const location = useLocation().pathname;

  return (
    <div className="body">
      <div className="form-wrapper wrapper-border">
        <header className="login-form-header">
          <ButtonClose
            nav={location === "/authentication/redirect" ? EXPLORE_PAGE : -1}
          />
          <Logo class="logo-icon-form" />
        </header>
        <Outlet />
      </div>
    </div>
  );
}
