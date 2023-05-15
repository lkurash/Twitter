export default function LoginFormButton(props) {
  return (
    <button className="login-form-button">
      <span className={props.class}>{props.buttonName}</span>
    </button>
  );
}
