import { useState } from "react";
import {
  loginPatient,
  loginDoctor,
  useAuthDispatch,
  useAuthState,
} from "../Context";

const Doctor = (props) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [state, setState] = useState(initialState);
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const handleOnChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await loginDoctor(dispatch, state);
      if (!response && !response.doctor) {
        return;
      }
      props.history.push("/doctor");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="p-3" onSubmit={handleOnSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          name="email"
          value={state.email}
          onChange={handleOnChange}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          name="password"
          aria-describedby="error"
          minLength={6}
          value={state.password}
          onChange={handleOnChange}
          placeholder="Password"
        />
        <small id="error" className="form-text">
          {errorMessage}
        </small>
      </div>
      <button
        type="submit"
        className="btn btn-primary float-right"
        disabled={loading}
      >
        Login
      </button>
    </form>
  );
};

const Patient = (props) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [state, setState] = useState(initialState);
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const handleOnChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await loginPatient(dispatch, state);
      if (!response && !response.patient) {
        return;
      }
      props.history.push("/patient");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="p-3" onSubmit={handleOnSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          name="email"
          value={state.email}
          onChange={handleOnChange}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          name="password"
          aria-describedby="error"
          minLength={6}
          value={state.password}
          onChange={handleOnChange}
          placeholder="Password"
        />
        <small id="error" className="form-text">
          {errorMessage}
        </small>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="btn btn-primary float-right"
      >
        Login
      </button>
    </form>
  );
};

export const Login = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-background">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            HMS
          </a>
          <div>
            <a className="btn navbar-button" href="">
              Login
            </a>
            <a className="btn navbar-button ml-3" href="/register">
              Register
            </a>
          </div>
        </div>
      </nav>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card form-container">
              <div className="card-body">
                <ul className="nav nav-tabs" id="loginTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="doctorlogin-tab"
                      data-toggle="tab"
                      href="#doctorlogin"
                      role="tab"
                      aria-controls="doctorlogin"
                      aria-selected="true"
                    >
                      Doctor
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="patientlogin-tab"
                      data-toggle="tab"
                      href="#patientlogin"
                      role="tab"
                      aria-controls="patientlogin"
                      aria-selected="false"
                    >
                      Patient
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="loginTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="doctorlogin"
                    role="tabpanel"
                    aria-labelledby="doctorlogin-tab"
                  >
                    <Doctor {...props} />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="patientlogin"
                    role="tabpanel"
                    aria-labelledby="patientlogin-tab"
                  >
                    <Patient {...props} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
