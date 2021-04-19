import { Home } from "../components/Home";
import { PatientDashboard, DoctorDashboard } from "../components/Dashboard";
import { PatientAccount, DoctorAccount } from "../components/Account";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { ChangePassword } from "../components/ChangePassword";
import { Reception } from "../components/Reception";
import ChooseDoctor from "../components/ChooseDoctor";
import Visit from "../components/Visit";
import Report from "../components/Report";
import { Admin, AdminLogin } from "../components/Admin";
import PatientList from "../components/PatientList";
import DoctorReport from "../components/DoctorReport";

const routes = [
  {
    path: "/patient",
    component: PatientDashboard,
    type: "patient",
  },
  {
    path: "/doctor",
    component: DoctorDashboard,
    type: "doctor",
  },
  {
    path: "/patient/account",
    component: PatientAccount,
    type: "patient",
  },
  {
    path: "/reception",
    component: Reception,
    type: "patient",
  },
  {
    path: "/choosedoctor",
    component: ChooseDoctor,
    type: "patient",
  },
  {
    path: "/visit",
    component: Visit,
    type: "patient",
  },
  {
    path: "/report",
    component: Report,
    type: "patient",
  },
  {
    path: "/doctor/account",
    component: DoctorAccount,
    type: "doctor",
  },
  {
    path: "/doctor/report",
    component: DoctorReport,
    type: "doctor",
  },
  {
    path: "/patient/changepassword",
    component: ChangePassword,
    type: "patient",
  },
  {
    path: "/doctor/changepassword",
    component: ChangePassword,
    type: "doctor",
  },
  {
    path: "/patientlist",
    component: PatientList,
    type: "doctor",
  },
  {
    path: "/admin/changepassword",
    component: ChangePassword,
    type: "admin",
  },
  {
    path: "/",
    component: Home,
    type: "",
  },
  {
    path: "/login",
    component: Login,
    type: "",
  },
  {
    path: "/register",
    component: Register,
    type: "",
  },
  {
    path: "/adminlogin",
    component: AdminLogin,
    type: "",
  },
  {
    path: "/admin",
    component: Admin,
    type: "admin",
  },
];

export default routes;
