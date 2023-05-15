import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonMenu(props) {
  const navigate = useNavigate();
  return (
    <div
      className="menu-button"
      type="button"
      onClick={() => navigate(props.nav)}
    >
      <img src={props.path} alt={props.alt} className={props.class} />
      <span className="menu-button-name">{props.buttonName}</span>
    </div>
  );
}
