import React from "react";

export default ({ text, placeholder, id, select, textChange }) => (
  <input
    className="fillParent"
    type="text"
    placeholder={placeholder}
    value={text}
    maxLength="72"
    id={id}
    onClick={select}
    onChange={event => textChange(event.target.value)}
  />
);
