import React, { useState } from "react";
import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";

const MobileDrawer = ({ open, onClose }) => {
  const [placement, setPlacement] = useState("left");
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
    onClose();
  };

  return (
    <Drawer
      className="font-Poppins font-light text-[0.90rem] uppercase"
      title="BMS"
      placement={placement}
      closable={true}
      onClose={onClose}
      open={open}
      key={placement}
    >
      <p onClick={() => handleNavigation("/")}>Home</p>
      <p onClick={() => handleNavigation("/create-form")}>Create Form</p>
    </Drawer>
  );
};

export default MobileDrawer;
