import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useAuthDispatch, useAuthState } from "../Context";
import { chooseDoctor, visit } from "../Context/actions";
import { Navigation } from "./Navigation";

const DoctorCard = (props) => {
  const dispatch = useAuthDispatch(),
    { token, loading } = useAuthState();
  const onClickHandler = async() => {
    let data = await visit(dispatch, { token: "patient " + token, consultant: props.id });
    if (data && data.success) props.PROPS.history.push("/visit");
  };
  return (
    <div className="row mt-3 p-3 choose-doc-card">
      <div className="col-4">
        <div className="doc-name">{props.name}</div>
      </div>
      <div className="col-4">
        <div className="doc-degree">{props.degree}</div>
        <div className="doc-speciality">{props.speciality}</div>
      </div>
      <div className="col-2 offset-2">
        <button
          className="btn btn-primary"
          onClick={onClickHandler}
          disabled={loading}
        >
          Visit
        </button>
      </div>
    </div>
  );
};

const ChooseDoctor = (props) => {
  const [state, setState] = useState({
      success: "loading",
      foundspeciality: "",
      doctors: [],
    }),
    dispatch = useAuthDispatch(),
    { token, loading } = useAuthState();

  useEffect(async () => {
    const data = await chooseDoctor(dispatch, token);
    if (data && data.success) {
      if (data.foundspeciality) {
        setState({
          success: true,
          foundspeciality: true,
          doctors: data.doctors,
        });
      } else {
        setState({ ...state, success: true, foundspeciality: false });
      }
    } else {
      setState({ ...state, success: false });
    }
  }, []);

  if (state.success === "loading" || loading) return <div>Loading...</div>;
  else if (!state.success)
    return (
      <div>
        <Navigation homelink="/patient" active="choosedoctor" />
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
                  Some Error occurred... Please reload
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
  else if (!state.foundspeciality) return <Redirect to="/reception" />;
  else if (!state.doctors.length)
    return (
      <div>
        <Navigation homelink="/patient" />
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
                  No doctor found with specified speciality 😓
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
        <Navigation homelink="/patient" />
        <div className="container">
          <div className="row m-3">
            <div className="col-md-8 offset-md-2">
              {state.doctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id}
                  name={doctor.name}
                  degree={doctor.degree}
                  speciality={doctor.speciality}
                  id={doctor._id}
                  PROPS={props}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ChooseDoctor;
