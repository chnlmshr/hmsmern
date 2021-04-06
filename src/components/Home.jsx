import illus3 from "../images/illus3.svg";

export const Home = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-background">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            HMS
          </a>
          <div>
            <a className="btn navbar-button" href="/login">
              Login
            </a>
            <a className="btn navbar-button ml-3" href="/register">
              Register
            </a>
          </div>
        </div>
      </nav>
      <div className="container my-5 py-md-5">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <h2 className="md-5">We are here to help</h2>
            <p className="mt-4 text-justify">
              Tired of waiting in long queues? <br/>
              Want to maintain social distancing? <br/>
              Don't you need relief from hassle of running from counter to counter? <br/>
              You are at the right place.😃 <br/> <a href="/register">Register</a> now!
            </p>
            <p className="text-justify">
              No more long queues. <br />
              No more hassle of going from counter to counter. <br/>
              Providing you the access of hospital from the ease of home. <br />
            </p>
          </div>
          <div className="col-md-2 col-sm-0"></div>
          <div className="col-sm-12 col-md-6 mt-3 mt-md-0">
            <img
              src={illus3}
              className="mx-auto d-block img-fluid"
              alt="hospital"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
