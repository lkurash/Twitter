const SignUpFormInput = ({
  placeholder,
  value,
  setUserInfo,
  activeInput,
  checkUserInfo,
  onClick,
  name,
  password,
  login,
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
        {activeInput && (
          <div className="signup-header-active-input">
            <label className="signup-active-input">{placeholder}</label>
            {name && value.length > 0 && (
              <p className="signup-form-input-help">{value.length}/20</p>
            )}
            {password && value.length > 0 && (
              <p className="signup-form-input-help">{value.length}/100</p>
            )}
          </div>
        )}
        <input
          placeholder={activeInput ? "" : placeholder}
          type={password ? "password" : "text"}
          value={value}
          onChange={(e) => {
            if (name) {
              setUserInfo(e.target.value.trim().slice(0, 20));
            }
            if (login) {
              setUserInfo(e.target.value.trim().slice(0, 300));
            }
            if (password) {
              setUserInfo(e.target.value.trim().slice(0, 100));
            }
          }}
        />
      </div>
      <div className="signup-form-input-login-error">
        {!checkUserInfo && login && <p>Please enter a valid email.</p>}
      </div>
    </>
  );
};

export default SignUpFormInput;
