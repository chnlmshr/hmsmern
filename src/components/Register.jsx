import { useState } from "react";
import {
  registerPatient,
  registerDoctor,
  useAuthDispatch,
  useAuthState,
} from "../Context";

const RegisterForm = (props) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    dateofbirth: "",
    sex: "",
  };
  const [state, setState] = useState(initialState);
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const handleOnChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await registerPatient(dispatch, state);
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
      <h5 className="pb-3">Register Patient</h5>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="name"
          value={state.name}
          onChange={handleOnChange}
          placeholder="Name"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          name="email"
          value={state.email}
          onChange={handleOnChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          name="password"
          minLength={6}
          value={state.password}
          onChange={handleOnChange}
          placeholder="Password"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          name="confirmpassword"
          minLength={6}
          value={state.confirmpassword}
          onChange={handleOnChange}
          placeholder="Confirm Password"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="phone"
          className="form-control"
          name="phone"
          value={state.phone}
          onChange={handleOnChange}
          placeholder="Phone"
          required
        />
      </div>
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">DOB</div>
          </div>
          <input
            type="date"
            className="form-control"
            name="dateofbirth"
            id="dateofbirth"
            value={state.dateofbirth}
            onChange={handleOnChange}
            placeholder="Date of Birth"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <select
          name="sex"
          aria-describedby="error"
          className="custom-select"
          value={state.sex}
          onChange={handleOnChange}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        <small id="error" className="form-text">
          {errorMessage}
        </small>
      </div>
      <button
        type="submit"
        className="btn btn-primary float-right"
        disabled={loading}
      >
        Register
      </button>
    </form>
  );
};

export const Register = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-background">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            HMS
          </a>
          <div>
            <a className="btn navbar-button" href="/login">
              Login
            </a>
            <a className="btn navbar-button ml-3 active" href="">
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
                <RegisterForm {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
