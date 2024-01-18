import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="container d-flex justify-content-center mt-3 mb-3">
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
