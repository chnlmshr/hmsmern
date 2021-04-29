import { useState } from "react";
import {
  loginPatient,
  loginDoctor,
  useAuthDispatch,
  useAuthState,
} from "../Context";

const LoginForm = (props) => {
  const initialState = {
    email: "",
    password: "",
    doctor: false,
  };
  const [state, setState] = useState(initialState);
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const handleOnChange = (event) =>
    setState({
      ...state,
      [event.target.name]: event.target.value,
      doctor: event.target.name === "doctor" ? !state.doctor : state.doctor,
    });

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (state.doctor) {
      try {
        let response = await loginDoctor(dispatch, state);
        if (!response && !response.doctor) {
          return;
        }
        props.history.push("/doctor");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let response = await loginPatient(dispatch, state);
        if (!response && !response.patient) {
          return;
        }
        props.history.push("/patient");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className="p-3" onSubmit={handleOnSubmit}>
      <h5 className="pb-3">Login</h5>
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
      <div className="row">
        <div className="col-md-6">
          <input
            type="checkbox"
            name="doctor"
            id="doctor"
            className="m-2"
            checked={state.doctor}
            onChange={handleOnChange}
          />
          <label htmlFor="doctor">Login as a doctor</label>
        </div>
        <div className="col-md-6">
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary float-right"
          >
            Login
          </button>
        </div>
      </div>
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
            <a className="btn navbar-button active" href="">
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
                <LoginForm {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
