import React from "react";
import { Route, Routes } from "react-router-dom";
import { arrRoutes } from "./router/routes";
import MyNavbar from "./components/Navigation/MyNavbar";
import Popup from "./components/UI/Popup";

const AppRouter = () => {
  //   const routesArr = useAuth();

  return (
    <div>
      {/* <MainPage /> */}
      <MyNavbar />
      <Popup />
      <Routes>
        {arrRoutes.map((item, i) => (
          <Route path={item.path} element={item.element} key={i} />
        ))}
      </Routes>
      {/* <MyNavbar />
      <div style={{ marginTop: "2.5rem" }} />
      <Popup />
      <div className="main_page">
        <Routes>
          {routesArr.map((item, i) => (
            <Route path={item.path} element={item.element} key={i} />
          ))}
        </Routes>
      </div> */}
    </div>
  );
};

export default AppRouter;
