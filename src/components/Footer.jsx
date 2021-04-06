export const Footer = (props) => {
  return (
    <div className="jumbotron jumbotron-fluid mb-0 footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <h4 className="display-4">HMS</h4>
            <p>
              No more long queues. <br />
              No more hassle of going from counter to counter. <br/>
              Providing you the access of hospital from the ease of home. <br />
            </p>
            <div className="mt-4">Made with &#129505; by Aditya & Chanchal</div>
          </div>
          <div className="col-lg-4 col-12 offset-lg-2">
            <h6 className="ml-3 mb-3">Follow Us on</h6>
            <ul>
              <li>
                <a href="#" className="footerlink">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="footerlink">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="footerlink">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="footerlink">
                  linkedIn
                </a>
              </li>
            </ul>
            <div className="mt-4">Like Our work? <a href="#" className="footerlink"> Support Us! </a> 😋</div>
          </div>
        </div>
      </div>
    </div>
  );
};
