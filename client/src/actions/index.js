import { FETCH_USER, FETCH_SURVEYS } from "./types";
import Axios from "axios";

export const fetchUser = () => async dispatch => {
  const user = await Axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: user.data
  });
};

export const handleStripeToken = token => async dispatch => {
  const user = await Axios.post("/api/stripe", token);
  dispatch({
    type: FETCH_USER,
    payload: user.data
  });
};

export const sendSurvey = (formValues, history) => async dispatch => {
  const user = await Axios.post("/api/surveys", formValues);
  //Redirect Logic

  history.push("/surveys");

  dispatch({
    type: FETCH_USER,
    payload: user.data
  });
};

export const getAllSurveys = () => async dispatch => {
  const surveyList = await Axios.get("/api/surveys");

  dispatch({
    type: FETCH_SURVEYS,
    payload: surveyList.data
  });
};
