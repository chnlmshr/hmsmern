const Loading = (props) => {
  return (
    <div className="container">
      <div className="row mt-5"></div>
      <div className="row mt-5"></div>
      <div className="row mt-5"></div>
      <div className="row mt-5"></div>
      <div className="row mt-5">
        <div className="col-12">
          <div class="d-flex justify-content-center text-primary">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5"></div>
      <div className="row mt-5"></div>
      <div className="row mt-5"></div>
      <div className="row mt-5"></div>
    </div>
  );
};

export default Loading;
