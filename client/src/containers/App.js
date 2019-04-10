import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route } from "react-router-dom";

import { connect } from "react-redux";
import { fetchUser } from "../actions";
import Header from "./Header";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import SurveyNew from "../containers/surveys/SurveyNew";
class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(hot(App));
