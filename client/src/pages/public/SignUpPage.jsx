import { observer } from "mobx-react-lite";
import { useState } from "react";

import { AUTH_PAGE_PATH } from "../../utils/routs";

import SignUpForm from "../../components/forms/SignUpForm";
import CloseButton from "../../components/buttons/CloseButton";
import Logo from "../../components/common/Logo";
import PreviewRegistrationForm from "../../components/forms/PreviewRegistrationForm";

const SignUpPage = observer(() => {
  const [checkUserInfo, setCheckUserInfo] = useState(false);

  return (
    <div className="background-auth-form">
      <div className="form-wrapper wrapper-border">
        <header className="login-form-header">
          <CloseButton nav={AUTH_PAGE_PATH} />
          <Logo class="logo-icon-form" />
        </header>
        {!checkUserInfo ? (
          <SignUpForm setCheckUserInfo={setCheckUserInfo} />
        ) : (
          <PreviewRegistrationForm checkUserInfo={checkUserInfo} />
        )}
      </div>
    </div>
  );
});

export default SignUpPage;
