const SignUpFormInput = ({
  placeholder,
  value,
  setUserInfo,
  activeInput,
  onClick,
  name,
  password
}) => {
  return (
    <div
      onClick={onClick}
      className={
        !activeInput
          ? "signup-form-input"
          : "signup-form-input signup-input-active"
      }
    >
      {activeInput && (
        <label className="signup-active-input">{placeholder}</label>
      )}
      <input
        placeholder={activeInput ? "" : placeholder}
        type={password ? "password" : "text"}
        value={value}
        onChange={(e) => setUserInfo(e.target.value.trim())}
      />
      {activeInput && name && (
        <p className="signup-form-input-help">Min length 1 max 20</p>
      )}

      {activeInput && !name && (
        <p className="signup-form-input-help">Min length 1 max 30</p>
      )}
    </div>
  );
};

export default SignUpFormInput;
