import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route } from "react-router-dom";

import { connect } from "react-redux";
import { fetchUser } from "../actions";
import Header from "../containers/Header";
import Landing from "../components/Landing";
const Survey = () => <div>Hello from surveys</div>;
const SurveyNew = () => <div>Hello from New surveys</div>;

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
            <Route exact path="/surveys" component={Survey} />
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
