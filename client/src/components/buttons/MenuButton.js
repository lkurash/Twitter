import { NavLink } from "react-router-dom";

const MenuButton = ({
  classNameButtonImg,
  buttonNameClass,
  buttonName,
  nav,
  alt,
  img,
  id,
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `menu-button active-menu-button` : `menu-button notactive`
      }
      type="button"
      to={nav}
      id={id}
      end
    >
      <img src={img} alt={alt} className={classNameButtonImg} />
      <span className={`menu-button-name ${buttonNameClass}`}>
        {buttonName}
      </span>
    </NavLink>
  );
};

export default MenuButton;
