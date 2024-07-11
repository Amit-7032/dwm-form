import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "../../styles/layout.css";
import { Navbar, Sidebar } from "..";

function Layout() {
  return (
    <div className="container">
      <div className="layout-container position-relative ">
        <Sidebar />
        <div className="main-container">
          <Navbar />
          <div className="p-4">
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
