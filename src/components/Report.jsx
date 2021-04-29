import { useEffect, useState } from "react";
import { useAuthDispatch, useAuthState } from "../Context";
import { report } from "../Context/actions";
import { Navigation } from "./Navigation";
const Report = (props) => {
  const initialState = {
    dateCreated: "",
    lastModified: "",
    name: "",
    dateofbirth: "",
    sex: "",
    blood_group: "",
    consultant: "",
    complications: "",
    consultantWord: "",
    allergies: "",
    medicines: "",
    bedAllocated: 0,
  };
  const dispatch = useAuthDispatch(),
    { token, loading } = useAuthState();
  const [state, setState] = useState(initialState);
  useEffect(async () => {
    const data = await report(dispatch, token);
    if (data && data.success) {
      setState(data.report);
    }
  }, []);
  if (!loading && state.name === "") {
    return (
      <div>
        <Navigation homelink="/patient" active="report" />
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
                  No Report Created Yet 😊
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
  } else
    return (
      <div>
        <Navigation homelink="/patient" active="report" />
        <div className="container">
          <div className="row m-2 m-md-5">
            <div className="offset-md-2 col-md-8 report p-5 section-to-print">
              <div className="row">
                <div className="col-md-5 hospitalname display-3">HMS</div>
                <div className="col-md-5 offset-md-2">
                  <div className="row mt-3">
                    <div className="col-12 createdon">
                      Date Created: {state.dateCreated.split("T")[0]}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12 lastmodified">
                      Last Modified: {state.lastModified.split("T")[0]}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row mt-3">
                <div className="col-5">{state.name}</div>
                <div className="col-4">
                  DOB: {state.dateofbirth.split("T")[0]}
                </div>
                <div className="col-3">{state.sex}</div>
              </div>

              <hr />
              <div className="row mt-3">
                <div className="col-4">
                  <strong>Blood Group:</strong> {state.blood_group}
                </div>
                <div className="col-2">
                  <strong>Bed:</strong>{" "}
                  {state.bedAllocated > 0 ? state.bedAllocated : "N/A"}
                </div>
                <div className="col-6">
                  <strong>Consultant:</strong> {state.consultant}
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-justify mt-4">
                  <strong>Complications: </strong> {state.complications}
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-justify mt-4">
                  <strong>Consultats's Word: </strong> {state.consultantWord}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-6">
                  <strong>Allergies:</strong> {state.allergies}
                </div>
                <div className="col-6">
                  <strong>Medicines:</strong> {state.medicines}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Report;
