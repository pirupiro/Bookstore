import axios from "axios";

const setToken = (token) => {
  console.log("token exist: " + token);
  if (token) {
    axios.defaults.headers.common["sender"] = token;
    return axios.defaults.headers.common["sender"]
  } else {
    delete axios.defaults.headers.common["sender"];
  }
};

export default setToken;
