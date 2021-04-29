import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  useAuthDispatch,
  useAuthState,
  loginAdmin,
  registerDoctor,
  logout,
  bedUpdate,
} from "../Context";

const Beds = (props) => {
  const initialState = {
    speciality: "",
    maxcapacity: "",
    successMessage: "",
    errorMessage: "",
  };
  const [state, setState] = useState(initialState);
  const dispatch = useAuthDispatch();
  const { loading, token } = useAuthState();

  const handleOnChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      successMessage: "",
      errorMessage: "",
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await bedUpdate(dispatch, {
        speciality: state.speciality,
        maxcapacity: state.maxcapacity,
        token: "admin " + token,
      });
      if (!data || !data.success)
        setState({
          ...state,
          errorMessage: "Something went Wrong!",
          successMessage: "",
        });
      else
        setState({
          ...state,
          successMessage: "Beds Updated Successfully",
          errorMessage: "",
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="p-3" onSubmit={handleOnSubmit}>
      <h5 className="pb-3">Update Beds</h5>
      <div className="input-group mb-3">
        <select
          name="speciality"
          className="custom-select"
          value={state.speciality}
          onChange={handleOnChange}
          required
        >
          <option value="">Choose speciality</option>
          <option value="General">General</option>
          <option value="Children">Children</option>
          <option value="Gynecology">Gynecology</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Nephrology">Nephrology</option>
          <option value="Neurology">Neurology</option>
          <option value="Oncology">Oncology</option>
          <option value="Orthopaedics">Orthopaedics</option>
        </select>
      </div>
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Total Number of Beds</div>
          </div>
          <input
            type="number"
            className="form-control"
            name="maxcapacity"
            aria-describedby="error"
            value={state.degree}
            onChange={handleOnChange}
            required
          />
        </div>
        <small id="error" className="form-text">
          {state.errorMessage}
          <div className="successMessage">{state.successMessage}</div>
        </small>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="btn btn-primary float-right"
      >
        Update
      </button>
    </form>
  );
};

export const AdminLogin = (props) => {
  const initialState = {
    adminId: "",
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
      const data = await loginAdmin(dispatch, state);
      if (data.admin) props.history.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-background">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            HMS
          </a>
          <div className="nav-item active mr-auto">
            <a className="nav-link nav-dropdown-link-color" href="/">
              Home
            </a>
          </div>
        </div>
      </nav>
      <div className="container my-md-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="form-container my-5 pb-5 px-3 pt-2">
              <form className="p-3" onSubmit={handleOnSubmit}>
                <h5 className="pb-3">Admin Login</h5>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="adminId"
                    value={state.adminId}
                    onChange={handleOnChange}
                    placeholder="Admin Id"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Doctor = (props) => {
  const initialState = {
    email: "",
    password: "",
    successMessage: "",
  };
  const [state, setState] = useState(initialState);
  const dispatch = useAuthDispatch();
  const { loading, errorMessage, token } = useAuthState();

  const handleOnChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      successMessage: "",
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await registerDoctor(dispatch, {
        ...state,
        token: "admin " + token,
      });
      if (!response && !response.doctor) {
        return;
      }
      setState({
        ...initialState,
        successMessage: "Doctor added successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="p-3" onSubmit={handleOnSubmit}>
      <h5 className="pb-3">Register Doctor</h5>
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
          aria-describedby="error"
          value={state.degree}
          onChange={handleOnChange}
          placeholder="Password"
          required
        />
        <small id="error" className="form-text">
          {errorMessage}
          <span className="text-success">{state.successMessage}</span>
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

export const Admin = (props) => {
  const dispatch = useAuthDispatch();
  const logoutHandler = async () => {
    await logout(dispatch);
    props.history.push("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-background">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            HMS
          </a>
          <div className="nav-item active mr-auto">
            <a className="nav-link nav-dropdown-link-color" href="/">
              Home
            </a>
          </div>
          <div className="nav-item active">
            <a
              className="nav-link nav-dropdown-link-color"
              href="/admin/changepassword"
            >
              Change Password
            </a>
          </div>
          <div className="nav-item active">
            <button
              className="btn nav-link nav-dropdown-link-color"
              onClick={logoutHandler}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      </nav>
      <div className="container my-md-5">
        <div className="row">
          <div className="col-md-6">
            <div className="form-container my-5 pb-5 px-3 pt-2">
              <Doctor />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-container my-5 pb-5 px-3 pt-2">
              <Beds />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
