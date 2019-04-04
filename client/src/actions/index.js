import { FETCH_USER } from "./types";
import Axios from "axios";

export const fetchUser = () => async dispatch => {
  const user = await Axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: user.data
  });
};
