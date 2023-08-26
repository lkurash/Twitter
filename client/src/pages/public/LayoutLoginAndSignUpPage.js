import { Outlet, useLocation } from "react-router-dom";

import { EXPLORE_PAGE_PATH } from "../../utils/constans";

import ButtonClose from "../../components/buttons/ButtonClose";
import Logo from "../../components/common/Logo";

import "../../components/forms/loginAndRegistretionForm.css";

export default function LayoutLoginAndSignUpPage() {
  const location = useLocation().pathname;

  return (
    <div className="body">
      <div className="form-wrapper wrapper-border">
        <header className="login-form-header">
          <ButtonClose
            nav={
              location === "/authentication/redirect" ? EXPLORE_PAGE_PATH : -1
            }
          />
          <Logo class="logo-icon-form" />
        </header>
        <Outlet />
      </div>
    </div>
  );
}
