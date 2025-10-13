import React from "react";

import Nav from "react-bootstrap/Nav";
import MyNavLink from "./MyNavLink";

import { arrRoutes } from "../../router/routes";
import ThemeBox from "../ImgBack/ThemeBox";

const MyNavbar = () => {
  //get  elements with nameNav only

  return (
    <div className="nav-menu d-flex pb-1 pt-2 pe-4 ps-2 w-100 justify-content-between">
      <div id="navidPortal">
        <ThemeBox />
      </div>
      <div id="navidPortalCenter"></div>
      <div className="d-flex">
        {arrRoutes
          .filter((el) => el.nameNav)
          .map((item, i) => (
            <Nav.Item key={i}>
              <MyNavLink root={item} />
            </Nav.Item>
          ))}
      </div>
    </div>
  );
};

export default MyNavbar;
