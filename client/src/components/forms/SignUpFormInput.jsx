const SignUpFormInput = ({
  placeholder,
  value,
  setUserInfo,
  activeInput,
  checkUserInfo,
  onClick,
  name,
  password,
  email,
  length,
}) => {
  
  const getClassName = () => {
    if (activeInput) {
      return "signup-form-input signup-input-active";
    }
    if (!checkUserInfo) {
      return "signup-form-input signup-input-error";
    } else {
      return "signup-form-input";
    }
  };
  return (
    <>
      <div onClick={onClick} className={getClassName()}>
        {(activeInput || value.length > 0) && (
          <div className="signup-header-active-input">
            <p className="signup-active-input">{placeholder}</p>
            {!email && value.length > 0 && (
              <p className="signup-form-hint-length">
                {value.length}/{length}
              </p>
            )}
          </div>
        )}
        <input
          name="signUpFormInput"
          placeholder={activeInput ? "" : placeholder}
          type={password ? "password" : "text"}
          value={value}
          onChange={(e) => {
            setUserInfo(e.target.value.trim().slice(0, length));
          }}
        />
      </div>
      <div className="signup-form-hint-login-error">
        {!checkUserInfo && email && <p>Please enter a valid email.</p>}
      </div>
    </>
  );
};

export default SignUpFormInput;
