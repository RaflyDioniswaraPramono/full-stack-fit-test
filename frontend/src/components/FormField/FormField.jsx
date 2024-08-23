import PropTypes from "prop-types";
import { ErrorMessage, Field } from "formik";
import React from "react";

const FormField = (props) => {
  return (
    <React.Fragment>
      <p className="text-xs text-zinc-500 mb-2">
        {props.label}
      </p>
      <Field
        required
        type={props.type}
        name={props.name}
        autoComplete="off"
        className="disabled:text-zinc-400 w-full p-3 text-sm leading-snug focus:outline-none border border-zinc-300 rounded-sm resize-none"
        placeholder=" "
        {...props}
      />
      <ErrorMessage name={props.name} />
    </React.Fragment>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default FormField;
