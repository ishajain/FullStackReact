import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "../containers/Header";

const Landing = () => <div>Landing</div>;
const Survey = () => <div>Hello from surveys</div>;
const SurveyNew = () => <div>Hello from New surveys</div>;

const App = () => (
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
export default hot(App);
