import React from "react";
import { connect } from "react-redux";
import FIELDS from "./formFields";
import _ from "lodash";
import { sendSurvey } from "../../actions/index";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({
  onSurveyFormReviewCancel,
  formValues,
  sendSurvey,
  history
}) => {
  const reviewFields = _.map(FIELDS, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries </h5>
      <div>{reviewFields}</div>
      <button
        className="yellow darken-3 left white-text btn-flat"
        onClick={onSurveyFormReviewCancel}
      >
        Back
      </button>
      <button
        className="green darken-3 right white-text btn-flat"
        onClick={() => sendSurvey(formValues, history)}
      >
        Send Survey<i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = ({
  form: {
    SURVEY_FORM: { values }
  }
}) => {
  return { formValues: values };
};

export default connect(
  mapStateToProps,
  { sendSurvey }
)(withRouter(SurveyFormReview));
