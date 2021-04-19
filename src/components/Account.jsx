import { useEffect, useState } from "react";
import {
  useAuthDispatch,
  useAuthState,
  updateAccount,
  logout,
  fetchPatient,
  fetchDoctor,
} from "../Context";
import { Navigation } from "./Navigation";

export const PatientAccount = (props) => {
  const email = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).email
    : "";
  const phone = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).phone
    : "";
  const allergies = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).allergies
    : "";
  const customaddress = Boolean(
    JSON.parse(localStorage.getItem("currentUser")).address
  )
    ? JSON.parse(localStorage.getItem("currentUser")).address.custom
    : "";
  const city = JSON.parse(localStorage.getItem("currentUser")).address
    ? JSON.parse(localStorage.getItem("currentUser")).address.city
    : "";
  const addstate = JSON.parse(localStorage.getItem("currentUser")).address
    ? JSON.parse(localStorage.getItem("currentUser")).address.state
    : "";
  const zip = JSON.parse(localStorage.getItem("currentUser")).address
    ? JSON.parse(localStorage.getItem("currentUser")).address.zip
    : "";
  const blood_group = Boolean(
    JSON.parse(localStorage.getItem("currentUser")).blood_group
  )
    ? JSON.parse(localStorage.getItem("currentUser")).blood_group
    : "";
  const initialState = {
    phone: "" || phone,
    email: "" || email,
    customaddress: "" || customaddress,
    city: "" || city,
    state: "" || addstate,
    zip: "" || zip,
    allergies: "" || allergies,
    bloodgroup: "" || blood_group,
    errorMessage: "",
    successMessage: "",
  };
  const [state, setState] = useState(initialState);

  const dispatch = useAuthDispatch();
  const { token, loading } = useAuthState();

  const handleOnChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await updateAccount(dispatch, {
        ...state,
        token: "patient " + token,
      });
      if (res.success) {
        await fetchPatient(dispatch, token);
        setState({
          ...state,
          successMessage: "Data successfully Updated!",
        });
      } else
        setState({ ...initialState, errorMessage: "Something went wrong!" });
    } catch (error) {
      setState({ ...initialState, errorMessage: "Something went wrong!" });
    }
  };

  return (
    <div>
      <Navigation homelink="/patient" active="account" />
      <div className="container">
        <div className="row my-5 py-md-5">
          <div className="offset-md-2 col-md-8">
            <div id="accordion">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Personal
                    </button>
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    <form className="p-3" onSubmit={handleOnSubmit}>
                      <div className="form-group">
                        <input
                          type="phone"
                          className="form-control"
                          name="phone"
                          value={state.phone}
                          onChange={handleOnChange}
                          placeholder="Phone"
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
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="customaddress"
                          value={state.customaddress}
                          onChange={handleOnChange}
                          placeholder="H No. 123, Near xyz"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={state.city}
                          onChange={handleOnChange}
                          placeholder="City"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          value={state.state}
                          onChange={handleOnChange}
                          placeholder="State"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          name="zip"
                          aria-describedby="error"
                          value={state.zip}
                          onChange={handleOnChange}
                          placeholder="Zip"
                        />
                        <small id="error" className="form-text">
                          {state.errorMessage}
                          <div className="successMessage">
                            {state.successMessage}
                          </div>
                        </small>
                      </div>
                      <button
                        disabled={loading}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Medical
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    <form className="p-3" onSubmit={handleOnSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="allergies"
                          value={state.allergies}
                          onChange={handleOnChange}
                          placeholder="Allergies eg. allergy 1, allergy 2, ..."
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="bloodgroup"
                          aria-describedby="error"
                          value={state.bloodgroup}
                          onChange={handleOnChange}
                          placeholder="Bloodgroup"
                        />
                        <small id="error" className="form-text">
                          {state.errorMessage}
                          <div className="successMessage">
                            {state.successMessage}
                          </div>
                        </small>
                      </div>
                      <button
                        disabled={loading}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    </form>
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

export const DoctorAccount = (props) => {
  const name = localStorage.getItem("currentUser")
    ? Boolean(JSON.parse(localStorage.getItem("currentUser")).name)
      ? JSON.parse(localStorage.getItem("currentUser")).name
      : ""
    : "";
  const email = localStorage.getItem("currentUser")
    ? Boolean(JSON.parse(localStorage.getItem("currentUser")).email)
      ? JSON.parse(localStorage.getItem("currentUser")).email
      : ""
    : "";
  const phone = localStorage.getItem("currentUser")
    ? Boolean(JSON.parse(localStorage.getItem("currentUser")).phone)
      ? JSON.parse(localStorage.getItem("currentUser")).phone
      : ""
    : "";
  const speciality = localStorage.getItem("currentUser")
    ? Boolean(JSON.parse(localStorage.getItem("currentUser")).speciality)
      ? JSON.parse(localStorage.getItem("currentUser")).speciality
      : ""
    : "";
  const degree = localStorage.getItem("currentUser")
    ? Boolean(JSON.parse(localStorage.getItem("currentUser")).degree)
      ? JSON.parse(localStorage.getItem("currentUser")).degree
      : ""
    : "";
  const avgDiagnosisTime = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).avgDiagnosisTime
    : "";
  const initialState = {
    name: "" || name,
    phone: "" || phone,
    email: "" || email,
    speciality: "" || speciality,
    degree: "" || degree,
    avgDiagnosisTime: "" || avgDiagnosisTime,
    errorMessage: "",
    successMessage: "",
  };
  const [state, setState] = useState(initialState);

  const dispatch = useAuthDispatch();
  const { token, loading } = useAuthState();

  const handleOnChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await updateAccount(dispatch, {
        ...state,
        token: "doctor " + token,
      });
      if (res.success) {
        await fetchDoctor(dispatch, token);
        setState({
          ...state,
          successMessage: "Data successfully Updated!",
        });
      } else
        setState({ ...initialState, errorMessage: "Something went wrong!" });
    } catch (error) {
      setState({ ...initialState, errorMessage: "Something went wrong!" });
    }
  };

  return (
    <div>
      <Navigation homelink="/doctor" active="account" />
      <div className="container">
        <div className="row my-5 py-md-5">
          <div className="offset-md-2 col-md-8">
            <div id="accordion">
              <div className="card">
                <div className="card-body">
                  <form className="p-3" onSubmit={handleOnSubmit}>
                    <h5 className="pb-3">Update Account</h5>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={state.name}
                        onChange={handleOnChange}
                        placeholder="Name"
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
                      />
                    </div>
                    <div className="input-group mb-3">
                      <select
                        name="speciality"
                        className="custom-select"
                        value={state.speciality}
                        onChange={handleOnChange}
                      >
                        <option value="">Choose speciality</option>
                        <option value="Dental">Dental</option>
                        <option value="ENT">ENT</option>
                        <option value="Gynecology">Gynecology</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Pulmonology">Pulmonology</option>
                        <option value="Neprology">Neprology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Oncology">Oncology</option>
                        <option value="Orthopaedics">Orthopaedics</option>
                        <option value="Dermatology">Dermatology</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            Average Diagnosis Time (in hours)
                          </div>
                        </div>
                        <input
                          type="avgDiagnosisTime"
                          className="form-control"
                          name="avgDiagnosisTime"
                          value={state.avgDiagnosisTime}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="degree"
                        aria-describedby="error"
                        value={state.degree}
                        onChange={handleOnChange}
                        placeholder="Degree (Highest)"
                      />
                      <small id="error" className="form-text">
                        {state.errorMessage}
                        <div className="successMessage">
                          {state.successMessage}
                        </div>
                      </small>
                    </div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
