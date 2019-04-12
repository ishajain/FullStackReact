import React from "react";
import { connect } from "react-redux";
import { getAllSurveys } from "../../actions/index";

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.getAllSurveys();
  }

  renderSurveys() {
    return this.props.surveys.surveyList
      .reverse()
      .map(({ title, yes, no, body, dateSent, id }) => {
        return (
          <div className="card darken-1" key={id}>
            <div className="card-content">
              <span className="card-title">{title}</span>
              <p>{body}</p>
              <p className="right">
                Sent On: {new Date(dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a>Yes: {yes}</a>
              <a>No: {no}</a>
            </div>
          </div>
        );
      });
  }
  render() {
    return this.props.surveys.length === 0 ? (
      <div>Loading...</div>
    ) : (
      <div>{this.renderSurveys()}</div>
    );
  }
}

const mapStateToProps = ({ surveys }) => ({ surveys });

export default connect(
  mapStateToProps,
  { getAllSurveys }
)(SurveyList);
