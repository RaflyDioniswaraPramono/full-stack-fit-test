import { Appbar, Navbar, Sidebar } from "../../components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-1 grid grid-rows-10">
        <div className="row-span-1 sticky top-0">
          <Appbar />
        </div>
        <div className="row-span-9">
          <Sidebar />
        </div>
      </div>
      <div className="col-span-4 grid grid-rows-10 overflow-y-auto">
        <div className="row-span-1 sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="row-span-9 p-5 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
