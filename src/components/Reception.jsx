import { useEffect, useState } from "react";
import {
  fetchPatient,
  reception,
  useAuthDispatch,
  useAuthState,
} from "../Context";
import { Navigation } from "./Navigation";

export const Reception = (props) => {
  const name = JSON.parse(localStorage.getItem("currentUser")).name;
  const email = JSON.parse(localStorage.getItem("currentUser")).email;
  const phone = JSON.parse(localStorage.getItem("currentUser")).phone;
  const allergies = JSON.parse(localStorage.getItem("currentUser")).allergies;
  const { loading, token } = useAuthState(),
    dispatch = useAuthDispatch();

  const initialState = {
      name: name,
      phone: phone,
      email: email,
      allergies: allergies,
      complications: "",
      errorMessage: "",
      department: "",
    },
    [state, setState] = useState(initialState);
  const handleOnChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      errorMessage: "",
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await reception(dispatch, {
        ...state,
        token: "patient " + token,
      });
      if (res.success) props.history.push("/chooseDoctor");
      else setState({ ...initialState, errorMessage: "Something went wrong!" });
    } catch (error) {
      setState({ ...initialState, errorMessage: "Something went wrong!" });
    }
  };
  useEffect(async () => {
    await fetchPatient(dispatch, token);
  }, []);

  return (
    <div>
      <Navigation homelink="/patient" active="reception" />
      <div className="container">
        <div className="row my-5 py-md-5">
          <div className="offset-md-2 col-md-8">
            <div id="accordion">
              <div className="card">
                <div className="card-body">
                  <form className="p-3" onSubmit={handleOnSubmit}>
                    <h5 className="pb-3">Reception</h5>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={state.name}
                        disabled
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
                        disabled
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
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="allergies"
                        value={state.allergies}
                        onChange={handleOnChange}
                        placeholder="Allergies"
                        disabled
                      />
                    </div>
                    <div className="input-group mb-3">
                      <select
                        name="department"
                        className="custom-select"
                        value={state.value}
                        onChange={handleOnChange}
                      >
                        <option value="">Choose Department</option>
                        <option value="Dental">Dental</option>
                        <option value="General">General</option>
                        <option value="Children">Children</option>
                        <option value="ENT">ENT(Ear Nose Throat)</option>
                        <option value="Gynecology">
                          Gynecology(Female eproductive System)
                        </option>
                        <option value="Cardiology">Cardiology(Heart)</option>
                        <option value="Pulmonology">Pulmonology(Lungs)</option>
                        <option value="Nephrology">Nephrology(Kidney)</option>
                        <option value="Neurology">
                          Neurology(Nervous System)
                        </option>
                        <option value="Oncology">Oncology(Cancer)</option>
                        <option value="Orthopaedics">
                          Orthopaedics(Bones)
                        </option>
                        <option value="Dermatology">Dermatology(Skin)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="complications"
                        aria-describedby="error"
                        value={state.complications}
                        onChange={handleOnChange}
                        placeholder="Complication Description"
                      />
                      <small id="error" className="form-text">
                        {state.errorMessage}
                      </small>
                    </div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Choose Doctor
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
