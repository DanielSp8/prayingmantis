import axios from "axios";
import {
  authLoading,
  signIn,
  authError,
  clearErrors,
} from "../reducers/authReducer";

// Sign-in action
export const signIn = (username, password) => async (dispatch) => {
  // Dispatch loading state
  dispatch({ type: "AUTH_LOADING" });

  try {
    // Make an API request to sign in
    const response = await ReadPrayerList.post("/users/login", {
      username: username,
      password: password,
    });

    // If successful, dispatch SIGN_IN with the token
    dispatch({
      type: "SIGN_IN",
      payload: response.data.token,
    });
  } catch (error) {
    // If there's an error, dispatch it
    dispatch({
      type: "AUTH_ERROR",
      payload: error.response ? error.response.data.message : "Server error",
    });
  }
};

// Sign-out action
export const signOut = () => ({
  type: "SIGN_OUT",
});

// Clear the error state (useful after showing the error to the user or before a new request)
export const clearErrors = () => ({
  type: "CLEAR_ERRORS",
});
