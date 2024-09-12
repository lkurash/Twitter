import dotMenu from "../Imgs/more_dots_icon.png";

const DotMenuButton = (props) => {
  return (
    <div className={props.class}>
      <div className="dotmenu">
        <img src={dotMenu} alt="dot menu" className="dotmenu-icon" />
      </div>
    </div>
  );
};

export default DotMenuButton;
