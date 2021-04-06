import { useState } from "react";
import {
  useAuthDispatch,
  useAuthState,
  changePassword,
  changePasswordAdmin,
} from "../Context";

export const ChangePassword = (props) => {
  const initialState = {
    password: "",
    newpassword: "",
  };
  const [state, setState] = useState(initialState);
  const dispatch = useAuthDispatch();
  const { patient, loading, errorMessage, token, doctor } = useAuthState();

  const handleOnChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      await (Boolean(patient)
        ? changePassword(dispatch, { ...state, token: "patient " + token })
        : Boolean(doctor)
        ? changePassword(dispatch, { ...state, token: "doctor " + token })
        : changePasswordAdmin(dispatch, { ...state, token: "admin " + token }));
      props.history.push("/");
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
                <h5 className="pb-3">Change Password</h5>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    minLength={6}
                    value={state.password}
                    onChange={handleOnChange}
                    placeholder="Old Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="newpassword"
                    aria-describedby="error"
                    minLength={6}
                    value={state.newpassword}
                    onChange={handleOnChange}
                    placeholder="New Password"
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
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
