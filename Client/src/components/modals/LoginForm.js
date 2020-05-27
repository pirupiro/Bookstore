import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/auth/AuthContext";
import useForm from "../hooks/useForm";
// import "../styles/Login.css";
import history from "../../router/history";

export default function LoginForm() {
  const { handleChange, handleSubmit, values } = useForm(submit, {
    username: "",
    password: "",
  });
  const { username, password } = values;
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated, token } = authContext;
  /**
   * * pass data with image in form data
   */
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, token, history]);

  function submit(status) {
    const newData = {
      username: values.username,
      password: values.password,
    };
    login(newData);
    console.log(newData);
  }

  return (
    <div className="container">
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn center login_btn"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
