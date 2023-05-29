import RouterHTML from "./RouterHTML.js";

document.addEventListener("DOMContentLoaded", () => {
  RouterHTML({
    navLink: "nav ul li a",
    container: "#app",
    path: "./views",
    callback(name) {
      document.querySelector(
        "script[data-script]"
      ).src = `./controllers/${name}.js`;
    },
  });
});
