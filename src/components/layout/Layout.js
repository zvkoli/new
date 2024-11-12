import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => (
  <header className="bg-blue-600 text-white p-4">
    <h1>Header</h1>
  </header>
);

const Sidebar = () => (
  <aside className="bg-gray-800 text-white w-64 p-4 h-screen max-md:hidden">
    <ul>
      <li>Menu Item 1</li>
      <li>Menu Item 2</li>
      <li>Menu Item 3</li>
    </ul>
  </aside>
);

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  return hideLayout ? (
    <main className="flex-1 p-4 bg-gray-100">{children}</main>
  ) : (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
