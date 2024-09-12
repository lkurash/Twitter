import React from "react";

export default function ButtonSettings(props) {
  return (
    <div className="main-button-settings" type="button">
      <img src={props.path} alt={props.alt} className={props.class} />
    </div>
  );
}
