import { fromLS, toLS } from "./localStorage";
const dayTheme = {
  "--main-back": "#fdfeff",
  "--main-color": "#000000",
  "--line1": "#f6faff",
  "--line2": "#dadada",
  "--item-back": "#e5e9ea",
  "--accent": "#bcc5e8",
  "--menu": "#e2e2e2",
  "--sec-back": "#c7cacf91",
  "--sec-menu": "#ffffff61",
  "--second-color": "#868686",
};
const nightTheme = {
  "--main-back": "#1e1e1e",
  "--main-color": "white",
  "--line1": "#37373d",
  "--line2": "#414a5f",
  "--item-back": "#152938",
  "--accent": "#060606",
  "--menu": "#111111",
  "--sec-back": "#14265091",
  "--sec-menu": "#29293d61",
  "--second-color": "#f4dea0",
};
export const changeTheme = (isCheckedDay) => {
  toLS("thema", isCheckedDay ? "day" : "night");
  let colors = isCheckedDay ? { ...dayTheme } : { ...nightTheme };
  document.body.style.backgroundColor = colors["--color-back"];
  for (let key in colors) {
    document.documentElement.style.setProperty(key, colors[key]);
  }
};
export const getTheme = () => {
  let thema = fromLS("thema");
  if (thema === null) return "day";
  return thema;
};
