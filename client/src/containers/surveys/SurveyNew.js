//SurveyNew shows SurveyForm and SurveyFormReview
import React from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends React.Component {
  state = {
    showReview: false
  };

  renderContent() {
    if (this.state.showReview)
      return (
        <SurveyFormReview
          onSurveyFormReviewCancel={() => this.setState({ showReview: false })}
        />
      );
    return (
      <SurveyForm
        onSurveyFormSubmit={() => this.setState({ showReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "SURVEY_FORM"
})(SurveyNew);
