import { logout, useAuthDispatch } from "../Context";

export const Navigation = (props) => {
  const dispatch = useAuthDispatch();
  const logoutHandler = async () => {
    await logout(dispatch);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-background">
      <a className="navbar-brand" href={props.homelink}>
        HMS
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {props.homelink === "/patient" ? (
          <ul className="navbar-nav mr-auto">
            <li
              className={
                "nav-item " + (props.active === "dashboard" ? "active" : "")
              }
            >
              <a className="nav-link" href={props.homelink}>
                Home
              </a>
            </li>
            <li
              className={
                "nav-item " + (props.active === "account" ? "active" : "")
              }
            >
              <a className="nav-link" href={props.homelink + "/account"}>
                Account
              </a>
            </li>
            
            <li
              className={
                "nav-item " + (props.active === "reception" ? "active" : "")
              }
            >
              <a className="nav-link" href={"/reception"}>
                Reception
              </a>
            </li>
            <li
              className={
                "nav-item " + (props.active === "choosedoctor" ? "active" : "")
              }
            >
              <a className="nav-link" href={"/choosedoctor"}>
                Choose Doctor
              </a>
            </li>
            <li
              className={
                "nav-item " + (props.active === "report" ? "active" : "")
              }
            >
              <a className="nav-link" href={"/report"}>
                Report
              </a>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav mr-auto">
            <li
              className={
                "nav-item " + (props.active === "dashboard" ? "active" : "")
              }
            >
              <a className="nav-link" href={props.homelink}>
                Home
              </a>
            </li>
            <li
              className={
                "nav-item " + (props.active === "account" ? "active" : "")
              }
            >
              <a className="nav-link" href={props.homelink + "/account"}>
                Account
              </a>
            </li>
            <li
              className={
                "nav-item " + (props.active === "patientlist" ? "active" : "")
              }
            >
              <a className="nav-link" href={"/patientlist"}>
                Patients
              </a>
            </li>
          </ul>
        )}
        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle nav-dropdown-link-color"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Hi,{" "}
            {props.username ||
            Boolean(JSON.parse(localStorage.getItem("currentUser")).name)
              ? JSON.parse(localStorage.getItem("currentUser")).name
              : "User"}
          </a>
          <div
            className="dropdown-menu dropdown-menu-lg-right"
            aria-labelledby="navbarDropdown"
          >
            <a
              className="dropdown-item"
              href={props.homelink + "/changepassword"}
            >
              Change Password
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item btn" onClick={logoutHandler}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
