import dotMenu from "../Img/more_dots_icon.png";

const ButtonDotMenu = (props) => {
  return (
    <div className={props.class}>
      <div className="dotmenu">
        <img src={dotMenu} alt="dot menu" className="dotmenu-icon" />
      </div>
    </div>
  );
};

export default ButtonDotMenu;
