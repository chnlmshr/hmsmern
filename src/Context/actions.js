// ======================== Common =============================

const ROOT_URL = "https://hmsmernserver.herokuapp.com";

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  // localStorage.removeItem("currentUser");
  // localStorage.removeItem("token");
  // localStorage.removeItem("username");
  // localStorage.removeItem("visitingInfo");
  localStorage.clear();
}

// ======================== Patient =============================

export async function registerPatient(dispatch, registerPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerPayload),
  };

  try {
    dispatch({ type: "REQUEST_REGISTER" });
    let response = await fetch(
      `${ROOT_URL}/api/registerPatient`,
      requestOptions
    );
    let data = await response.json();

    if (data.patient) {
      localStorage.setItem("currentUser", JSON.stringify(data));
      dispatch({ type: "REGISTER_SUCCESS", payload: data });
      return data;
    }
    dispatch({ type: "REGISTER_ERROR", error: data.err });
    return;
  } catch (error) {
    dispatch({ type: "REGISTER_ERROR", error: "Something went wrong" });
  }
}

export async function loginPatient(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${ROOT_URL}/api/loginPatient`, requestOptions);
    let data = await response.json();
    if (data.patient) {
      localStorage.setItem("currentUser", JSON.stringify(data));
      dispatch({ type: "LOGIN_SUCCESS", payload: data });

      return data;
    } else dispatch({ type: "LOGIN_ERROR", error: data.err });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: "Something went wrong" });
  }
}

export async function fetchPatient(dispatch, token) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "patient " + token,
    },
  };

  try {
    let response = await fetch(`${ROOT_URL}/api/patient`, requestOptions);
    let data = await response.json();
    if (data.patient) {
      dispatch({ type: "PATIENT_FETCH_SUCCESS", payload: data.patient });
      if (localStorage.getItem("currentUser").length < 180)
        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.patient).slice(0, -1) +
            "," +
            localStorage.getItem("currentUser").slice(1)
        );
      else {
        let token = JSON.parse(localStorage.getItem("currentUser")).token;
        let patient = JSON.parse(localStorage.getItem("currentUser")).patient;
        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.patient).slice(0, -1) +
            "," +
            JSON.stringify({ token: token, patient: patient }).slice(1)
        );
      }
      return data.patient;
    } else {
      return { err: true };
    }
  } catch (error) {
    return { err: true };
  }
}

export async function changePassword(dispatch, passwordPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(passwordPayload),
  };

  try {
    dispatch({ type: "REQUEST_CHANGE_PASSWORD" });
    let response = await fetch(
      `${ROOT_URL}/api/changepassword`,
      requestOptions
    );
    let data = await response.json();
    if (data.token) {
      dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
    } else dispatch({ type: "CHANGE_PASSWORD_ERROR", error: data.err });
    return;
  } catch (error) {
    dispatch({ type: "CHANGE_PASSWORD_ERROR", error: "Something went wrong" });
  }
}

export async function updateAccount(dispatch, updatePayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatePayload),
  };

  try {
    dispatch({ type: "REQUEST_UPDATE_ACCOUNT" });
    let response = await fetch(
      `${ROOT_URL}/api/update${updatePayload.token.split(" ")[0]}account`,
      requestOptions
    );
    let data = await response.json();
    if (Boolean(data.success)) {
      dispatch({ type: "UPDATE_ACCOUNT_SUCCESS", payload: data });
    } else dispatch({ type: "UPDATE_ACCOUNT_ERROR" });
    return data;
  } catch (error) {
    dispatch({ type: "UPDATE_ACCOUNT_ERROR" });
  }
}

export async function reception(dispatch, receptionPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(receptionPayload),
  };

  try {
    dispatch({ type: "REQUEST_RECEPTION" });
    let response = await fetch(`${ROOT_URL}/api/reception`, requestOptions);
    let data = await response.json();
    if (Boolean(data.success)) {
      dispatch({ type: "RECEPTION_SUCCESS" });
    } else dispatch({ type: "RECEPTION_ERROR" });
    return data;
  } catch (error) {
    dispatch({ type: "RECEPTION_ERROR" });
  }
}

export async function chooseDoctor(dispatch, token) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "patient " + token,
    },
  };

  try {
    dispatch({ type: "REQUEST_CHOOSE_DOCTOR" });
    let response = await fetch(`${ROOT_URL}/api/choosedoctor`, requestOptions);
    let data = await response.json();
    if (Boolean(data.success)) {
      dispatch({ type: "CHOOSE_DOCTOR_SUCCESS" });
    } else dispatch({ type: "CHOOSE_DOCTOR_ERROR" });
    return data;
  } catch (error) {
    dispatch({ type: "CHOOSE_DOCTOR_ERROR" });
  }
}

export async function visit(dispatch, payload) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    dispatch({ type: "REQUEST_VISIT" });
    let response = await fetch(`${ROOT_URL}/api/visit`, requestOptions);
    let data = await response.json();
    if (Boolean(data.success)) {
      localStorage.setItem("visitingInfo", JSON.stringify(data));
      dispatch({ type: "VISIT_SUCCESS" });
    } else dispatch({ type: "VISIT_ERROR" });
    return data;
  } catch (error) {
    dispatch({ type: "VISIT_ERROR" });
  }
}

export async function report(dispatch, token) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "patient " + token,
    },
  };

  try {
    dispatch({ type: "REQUEST_REPORT" });
    let response = await fetch(`${ROOT_URL}/api/patientreport`, requestOptions);
    let data = await response.json();
    if (Boolean(data.success)) {
      dispatch({ type: "REPORT_SUCCESS" });
    } else dispatch({ type: "REPORT_ERROR" });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "REPORT_ERROR" });
  }
}

// ======================== Doctor =============================

export async function loginDoctor(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${ROOT_URL}/api/loginDoctor`, requestOptions);
    let data = await response.json();

    if (data.doctor) {
      localStorage.setItem("currentUser", JSON.stringify(data));
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      return data;
    } else dispatch({ type: "LOGIN_ERROR", error: data.err });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: "Something went wrong" });
  }
}

export async function fetchDoctor(dispatch, token) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "doctor " + token,
    },
  };

  try {
    let response = await fetch(`${ROOT_URL}/api/doctor`, requestOptions);
    let data = await response.json();
    if (data.doctor) {
      dispatch({ type: "DOCTOR_FETCH_SUCCESS", payload: data.doctor });
      if (localStorage.getItem("currentUser").length < 180)
        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.doctor).slice(0, -1) +
            "," +
            localStorage.getItem("currentUser").slice(1)
        );
      else {
        let token = JSON.parse(localStorage.getItem("currentUser")).token;
        let doctor = JSON.parse(localStorage.getItem("currentUser")).doctor;
        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.doctor).slice(0, -1) +
            "," +
            JSON.stringify({ token: token, doctor: doctor }).slice(1)
        );
      }
      return data.doctor;
    } else {
      return { err: true };
    }
  } catch (error) {
    return { err: true };
  }
}

export async function patientList(dispatch, token) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "doctor " + token,
    },
  };

  try {
    dispatch({ type: "REQUEST_CHOOSE_PATIENT" });
    let response = await fetch(`${ROOT_URL}/api/choosepatient`, requestOptions);
    let data = await response.json();
    if (Boolean(data.success)) {
      dispatch({ type: "CHOOSE_PATIENT_SUCCESS" });
    } else dispatch({ type: "CHOOSE_PATIENT_ERROR" });
    return data;
  } catch (error) {
    dispatch({ type: "CHOOSE_PATIENT_ERROR" });
  }
}

export async function doctorReport(dispatch, payload) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    dispatch({ type: "REQUEST_REPORT" });
    let response = await fetch(`${ROOT_URL}/api/doctorreport`, requestOptions);
    let data = await response.json();
    if (Boolean(data.success)) {
      dispatch({ type: "REPORT_SUCCESS" });
    } else dispatch({ type: "REPORT_ERROR" });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "REPORT_ERROR" });
  }
}

export async function EditDoctorReport(dispatch, payload) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    dispatch({ type: "REQUEST_REPORT" });
    let response = await fetch(
      `${ROOT_URL}/api/editdoctorreport`,
      requestOptions
    );
    let data = await response.json();
    if (Boolean(data.success)) {
      dispatch({ type: "REPORT_SUCCESS" });
    } else dispatch({ type: "REPORT_ERROR" });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "REPORT_ERROR" });
  }
}

// ======================== Admin =============================

export const loginAdmin = async (dispatch, loginPayload) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${ROOT_URL}/api/loginadmin`, requestOptions);
    let data = await response.json();
    if (data.admin) {
      localStorage.setItem("currentUser", JSON.stringify(data));
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      return data;
    } else dispatch({ type: "LOGIN_ERROR", error: data.err });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: "Something went wrong" });
  }
};

export async function registerDoctor(dispatch, registerPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerPayload),
  };

  try {
    dispatch({ type: "REQUEST_REGISTER" });
    let response = await fetch(
      `${ROOT_URL}/api/registerDoctor`,
      requestOptions
    );
    let data = await response.json();
    if (data.doctor) {
      dispatch({ type: "DOC_REGISTERED" });
      return true;
    }
    dispatch({ type: "REGISTER_ERROR", error: data.err });
    return false;
  } catch (error) {
    console.log(error);
    dispatch({ type: "REGISTER_ERROR", error: "Something went wrong!" });
  }
}

export async function changePasswordAdmin(dispatch, passwordPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(passwordPayload),
  };

  try {
    dispatch({ type: "REQUEST_CHANGE_PASSWORD" });
    let response = await fetch(
      `${ROOT_URL}/api/changepasswordadmin`,
      requestOptions
    );
    let data = await response.json();
    if (data.token) {
      dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
    } else dispatch({ type: "CHANGE_PASSWORD_ERROR", error: data.err });
    return;
  } catch (error) {
    dispatch({ type: "CHANGE_PASSWORD_ERROR", error: "Something went wrong" });
  }
}
