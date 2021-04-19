import { useEffect, useState } from "react";
import { useAuthDispatch, useAuthState } from "../Context";
import { patientList, visit } from "../Context";
import { Navigation } from "./Navigation";

const PatientCard = (props) => {
  const onClickHandler = async () => {
    localStorage.setItem("patientId", props.id);
    props.PROPS.history.push("/doctor/report");
  };
  return (
    <div className="row mt-3 p-3 choose-pat-card">
      <div className="col-4">
        <div className="pat-name">{props.name}</div>
      </div>
      <div className="col-4">
        <div className="pat-dob">DOB: {props.DOB.split("T")[0]}</div>
        <div className="pat-phone">Phone: {props.phone}</div>
      </div>
      <div className="col-2 offset-2">
        <button className="btn btn-primary" onClick={onClickHandler}>
          View
        </button>
      </div>
    </div>
  );
};

const PatientList = (props) => {
  const [state, setState] = useState({
      success: "loading",
      allPatients: [],
      patients: [],
    }),
    dispatch = useAuthDispatch(),
    { token, loading } = useAuthState();

  useEffect(async () => {
    let data = await patientList(dispatch, token);
    if (data && data.success) {
      setState({
        success: true,
        patients: data.patients,
        allPatients: data.patients,
        search: "",
      });
    } else {
      setState({ ...state, success: false });
    }
  }, []);

  const searchHandler = (event) => {
    let patients = [];
    state.allPatients.forEach((patient) => {
      if (patient.name.toLowerCase().search(event.target.value) !== -1) {
        patients.push(patient);
      }
    });
    setState({ ...state, patients: patients });
  };

  if (
    state.success === "loading" ||
    loading ||
    !state.success ||
    !state.allPatients.length
  )
    return (
      <div>
        <Navigation homelink="/doctor" active="patientlist" />
        <div className="container">
          <div className="row mt-5"></div>
          <div className="row mt-5"></div>
          <div className="row mt-md-5"></div>
          <div className="row mt-md-5"></div>
          <div className="row m-2">
            <div className="col-md-6 offset-md-3 visit-card p-5">
              <div className="row">
                <div className="col-md-8 offset-md-2"></div>
              </div>
              <div className="row">
                <div className="col-md-8 offset-md-2 text-bold">
                  {!state.success
                    ? "Some Error occurred... Please reload"
                    : state.success === "loading"
                    ? "Loading..."
                    : "No patient found for now 😓"}
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 offset-md-2"></div>
              </div>
            </div>
          </div>
          <div className="row mt-5"></div>
          <div className="row mt-5"></div>
          <div className="row mt-md-5"></div>
          <div className="row mt-md-5"></div>
        </div>
      </div>
    );
  else
    return (
      <div>
        <Navigation homelink="/doctor" active="patientlist"/>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-4 offset-md-4">
              <input
                type="text"
                name="search"
                className="search-patient-list form-control"
                placeholder={"Search"}
                onChange={searchHandler}
              />
            </div>
          </div>
          <div className="row mt-4 mb-5">
            <div className="col-md-8 offset-md-2">
              {state.patients.length ? (
                state.patients.map((patient) => (
                  <PatientCard
                    key={patient._id}
                    name={patient.name}
                    DOB={patient.DOB}
                    phone={patient.phone}
                    id={patient._id}
                    PROPS={props}
                  />
                ))
              ) : (
                <div className="text-center">No Matches 🙂</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default PatientList;
