const SignUpFormInput = ({
  placeholder,
  value,
  setUserInfo,
  activeInput,
  checkUserInfo,
  onClick,
  name,
  password,
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
    <div onClick={onClick} className={getClassName()}>
      {activeInput && (
        <label className="signup-active-input">{placeholder}</label>
      )}
      <input
        placeholder={activeInput ? "" : placeholder}
        type={password ? "password" : "text"}
        value={value}
        onChange={(e) => setUserInfo(e.target.value.trim().slice(0, 20))}
      />
      <p className="signup-form-input-help">Min length 1 max 20</p>
    </div>
  );
};

export default SignUpFormInput;
