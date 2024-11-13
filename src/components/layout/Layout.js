import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobileDrawer from "../template/MobileDrawer";
import { Spin as Hamburger } from "hamburger-react";

const Header = ({ onOpenDrawer, isDrawerOpen, setIsDrawerOpen }) => {
  return (
    <header className="h-[4rem] flex flex-row justify-start items-center px-3 bg-[#fff] shadow rounded-lg font-Poppins">
      <h1 className="font-semibold text-[1.5rem] text-gray-800 max-md:hidden">
        BMS
      </h1>
      <div
        className="hidden max-md:flex"
        onClick={() => {
          onOpenDrawer();
        }}
      >
        <Hamburger
          size={30}
          color="#000"
          duration={0.8}
          toggled={isDrawerOpen}
          toggle={setIsDrawerOpen}
        />
      </div>
    </header>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <aside className="bg-gray-800 text-white w-64 p-4 h-screen font-Poppins font-light uppercase max-md:hidden">
      <ul>
        <li onClick={() => handleNavigation("/")}>Home</li>
        <li onClick={() => handleNavigation("/create-form")}>Create Form</li>
      </ul>
    </aside>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return hideLayout ? (
    <main className="flex-1">{children}</main>
  ) : (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col gap-2 flex-1 p-3">
        <Header
          onOpenDrawer={showDrawer}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <main className="flex-1 bg-gray-100">{children}</main>
        <MobileDrawer open={isDrawerOpen} onClose={closeDrawer} />
      </div>
    </div>
  );
};

export default Layout;
