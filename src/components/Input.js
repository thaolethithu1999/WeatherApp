import React from "react";

import { FiSearch } from "react-icons/fi";

const Input = ({text, submit, func}) => {
  return (
    <form className="input" onSubmit={submit}>
      <input className="input-value" type={"text"} placeholder="Enter position..." onChange={text}/>
      <span className="input-icon" onClick={func}>
        <FiSearch />
      </span>
    </form>
  );
};

export default Input;
