import { NavLink } from "react-router-dom";

const ButtonMenu = ({
  classNameButtonImg,
  buttonName,
  classNameButton,
  nav,
  alt,
  img,
  id,
}) => {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isPending
          ? `menu-button ${classNameButton} active-menu-button`
          : isActive
          ? `menu-button ${classNameButton} active-menu-button`
          : `menu-button ${classNameButton} notactive`
      }
      type="button"
      to={nav}
      id={id}
    >
      <img src={img} alt={alt} className={classNameButtonImg} />
      <span className="menu-button-name">{buttonName}</span>
    </NavLink>
  );
};

export default ButtonMenu;
