import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import MyNavLink from "./MyNavLink";
import cl from "./MyNavbar.module.css";
import { arrRoutes } from "../../router/routes";
import ThemeBox from "../ImgBack/ThemeBox";

const MyNavbar = () => {
  const router = useNavigate();
  //get  elements with nameNav only

  return (
    <div className="nav-menu d-flex pb-1 pt-2 pe-4 ps-2 w-100 justify-content-between">
      <div id="navidPortal">
        <ThemeBox />
      </div>
      {arrRoutes
        .filter((el) => el.nameNav)
        .map((item, i) => (
          <Nav.Item key={i}>
            <MyNavLink root={item} />
          </Nav.Item>
        ))}
    </div>
  );
};

export default MyNavbar;
