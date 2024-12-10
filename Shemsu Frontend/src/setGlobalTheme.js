import Cookies from "js-cookie";

const setGlobalTheme = (theme) => {
  document.documentElement.style.setProperty(
    "--theme",
    theme === "Light" ? "#f5f5f5" : "#1e1919"
  );
  document.documentElement.style.setProperty(
    "--textTheme",
    theme === "Light" ? "#555" : "#DDD"
  );
  Cookies.set("theme", theme);
};

export default setGlobalTheme;
