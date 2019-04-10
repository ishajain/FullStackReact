import React from "react";
import { reduxForm, Field } from "redux-form";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div style={{ marginBottom: "20px" }} className="red-text">
        {touched && error}
      </div>
    </div>
  );
};
