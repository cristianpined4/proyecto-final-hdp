/* 
    RouterHTML.js --Version: 1.1.0
    Autor: Cristian Pineda <cristian.pineda.1997@outlook.com>
    License: MIT
    
    Params: 
        - navLink : css selector for links <a></a>.
        - container : css selector where the content will be displayed.
        - path : address of the folder where the .html files are stored.
        - callback : function that will be executed after loading the content.

    Note: the link href path must match the name of the .html file without the extension.
*/

"use strict";

String.prototype.toCapitalizerCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const RouterHTML = (
  option = { navLink: "", container: "", path: "", callback: "" }
) => {
  if (!(option instanceof Object))
    return console.error("> the option parameter must be an object");
  let { navLink, container, path, callback } = option,
    title = document.title;

  if (/index(.html|.php)+/g.test(location.pathname))
    location.pathname = location.pathname.replace(/index(.html|.php)+/g, "");

  document.querySelector(container).innerHTML = /*html*/ `
        <div id="loader" style="display: flex;justify-content: center;align-items: center;width: inherit;height: 80vh;">
            <img src="https://cristianpined4.github.io/CLJ-Library-CSS/documentation/svg/bars.svg" style="max-width: 20%; max-height: auto;">
        </div>
    `;

  document.querySelectorAll(navLink).forEach((el) => {
    el.classList.remove("active");
    el.href = `#/${el.href.replace(
      `${location.origin}${location.pathname}`,
      ""
    )}`;
  });
  let hash = document.querySelector(navLink).hash.replace("#/", "");
  if (location.hash !== "") hash = location.hash.replace("#/", "");
  if (hash === "") {
    document.title = `Page not found - ${title}`;
    return (document.querySelector(container).innerHTML =
      "<h1 class='error-message'>Error 404: Page not found</h1>");
  }

  fetch(`${path}/${hash}.html`)
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then((md) => {
      document.querySelector(container).innerHTML = md;
      document
        .querySelector(`${navLink}[href="#/${hash}"]`)
        .classList.add("active");
      document.title = `${hash.toCapitalizerCase()} - ${title}`;

      document.querySelectorAll(`${container} pre code`).forEach((el) => {
        el.innerHTML = el.innerHTML
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;");
      });
      if (callback != "" && callback instanceof Function) callback(hash);
    })
    .catch((err) => {
      document.title = `Page not found - ${title}`;
      document.querySelector(container).innerHTML =
        "<h1 class='error-message'>Error 404: Page not found</h1>";
    });

  document.addEventListener("click", (e) => {
    if (e.target.matches(navLink)) {
      document
        .querySelectorAll(navLink)
        .forEach((el) => el.classList.remove("active"));
      document.querySelector(container).innerHTML = /*html*/ `
                <div id="loader" style="display: flex;justify-content: center;align-items: center;width: inherit;height: 80vh;">
                    <img src="https://cristianpined4.github.io/CLJ-Library-CSS/documentation/svg/bars.svg" style="max-width: 20%; max-height: auto;">
                </div>
            `;
      let hash = e.target.hash.replace("#/", "");
      if (hash === "") {
        document.title = `Page not found - ${title}`;
        return (document.querySelector(container).innerHTML =
          "<h1 class='error-message'>Error 404: Page not found</h1>");
      }
      fetch(`${path}/${hash}.html`)
        .then((res) => (res.ok ? res.text() : Promise.reject(res)))
        .then((md) => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          document.querySelector(container).innerHTML = md;
          e.target.classList.add("active");
          document.title = `${hash.toCapitalizerCase()} - ${title}`;
          document.querySelectorAll(`${container} pre code`).forEach((el) => {
            el.innerHTML = el.innerHTML
              .replaceAll("<", "&lt;")
              .replaceAll(">", "&gt;");
          });
          if (document.querySelector(".navbar-collapse.collapse") != null)
            document
              .querySelector(".navbar-collapse.collapse")
              .classList.remove("show");
          if (callback != "" && callback instanceof Function) callback(hash);
        })
        .catch((err) => {
          document.title = `Page not found - ${title}`;
          document.querySelector(container).innerHTML =
            "<h1 class='error-message'>Error 404: Page not found</h1>";
        });
    }
  });
};

export default RouterHTML;
