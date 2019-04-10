import { FETCH_USER } from "./types";
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
