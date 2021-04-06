import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import Popper from "popper.js";
import "./App.css";
import React from "react";
import { Footer } from "./components/Footer";
import { BrowserRouter, Switch } from "react-router-dom";
import AppRoute from "./components/AppRoute";
import { AuthProvider } from "./Context";
import routes from "./Config/routes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            {routes.map((route) => (
              <AppRoute
                exact
                key={route.path}
                path={route.path}
                component={route.component}
                type={route.type}
              />
            ))}
          </Switch>
        </BrowserRouter>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
