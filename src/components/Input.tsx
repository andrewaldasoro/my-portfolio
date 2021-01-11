import React, { useRef } from "react";
import "./Input.scss";

const Input = (props: any): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);

  const classNames = props.className + " input";

  return <input {...props} ref={ref} type="text" className={classNames} />;
};

export default Input;
