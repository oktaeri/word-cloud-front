import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <div className="container d-flex justify-content-center mt-5">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
