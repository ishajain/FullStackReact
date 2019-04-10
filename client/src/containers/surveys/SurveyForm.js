import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";
import SurveyField from "./SurveyField";

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(FIELDS, ({ name, label }) => {
      return (
        <Field
          component={SurveyField}
          type="text"
          label={label}
          name={name}
          key={name}
        />
      );
    });
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSurveyFormSubmit)}>
        {this.renderFields()}
        <Link to="/surveys" className="red left white-text btn-flat">
          Cancel
          <i className="material-icons left">cancel</i>
        </Link>

        <button type="submit" className="teal right white-text btn-flat">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) return (errors[name] = noValueError);
  });

  return errors;
};

const surveyFormWrapper = reduxForm({
  form: "SURVEY_FORM",
  validate,
  destroyOnUnmount: false
})(SurveyForm);
export default connect()(surveyFormWrapper);
