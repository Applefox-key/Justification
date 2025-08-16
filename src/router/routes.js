import DmgPage from "../components/DimentionsPage/DmgPage";
import MainPage from "../components/MainPage";
import RubricPage from "../components/RubricPage/RubricPage";

export const arrRoutes = [
  // { path: "/about", element: <About />, nameNav: "About" },
  { path: "/main", element: <MainPage />, nameNav: "Main Page" },
  { path: "/rub", element: <RubricPage />, nameNav: "RUB" },
  { path: "/dmg", element: <DmgPage />, nameNav: "DNG" },
  { path: "/*", element: <MainPage />, nameNav: "" },
];
