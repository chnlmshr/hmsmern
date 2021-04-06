import { useEffect, useState } from "react";
import { Navigation } from "./Navigation";

const Visit = (props) => {
  const [state, setSate] = useState(10),
    visitingInfo = JSON.parse(localStorage.getItem("visitingInfo"));
  useEffect(() => {
    if (!state) props.history.push("/patient");
    else
      setTimeout(() => {
        setSate(state - 1);
      }, 1000);
  }, [state]);
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
              <div className="col-md-8 offset-md-2">
                <strong>Redirecting in {state}</strong>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 offset-md-2 text-bold">
                No. of patients before you:{" "}
                {visitingInfo ? visitingInfo.patientsInQueue : "N/A"}
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                Average waiting time:{" "}
                {visitingInfo ? visitingInfo.waitingTime + " hrs" : "N/A"}
              </div>
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
};

export default Visit;
