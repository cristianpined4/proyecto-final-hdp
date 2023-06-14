/*!
 * slideResponsive 1.0.2 - Compontent for Responsive Slider
 * Copyright 2021 - Cristian Pineda <cristian.pineda.1997@outlook.com>
 * Licensed under MIT
 */

"use strict";
const style = `<style>/* ----------------- Slider Responsive ----------------- */.slider{position:relative;width:100%;margin:0px auto;text-align:center;}.slider .slider-slides{position:relative;height:100vh;}.slider .slider-slides .slider-slide{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;visibility:hidden;transition:opacity 1s ease;}.slider .slider-slides .slider-slide div{width:inherit;height:inherit}.slider .slider-slides .slider-slide video,.slider .slider-slides .slider-slide img,.slider .slider-slides .slider-slide div > img,.slider .slider-slides .slider-slide div > video{width:inherit;height:inherit;object-fit:cover;object-position:center;}.slider .slider-slides .slider-slide.active{visibility:visible;opacity:1;}.slider .slider-btns{position:absolute;width:inherit;top:50%;display:flex;justify-content:space-between;font-size:2.2rem;font-weight:bold;}.slider .slider-btns a{display:inline-block;width:1.5rem;height:1.5rem;text-decoration:none;background:no-repeat 50%/100% 100%;transition:all .3s ease;}.slider .slider-btns a.next{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e");margin-right:1vw}.slider .slider-btns a.prev{background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e");margin-left:1vw}.slider .slider-slides .slider-slide div .caption{position: absolute;right: 15%;bottom: 20px;left: 15%;z-index: 10;padding-top: 20px;padding-bottom: 20px;color: #fff;text-align: center;} </style>`,
  header = `<style>/* ----------------- Slider Responsive - Style Header Active ----------------- */.slider .slider-slides .slider-slide div .caption{ right:0 !important; left:0 !important; bottom:0 !important; top:0 !important; background:#000000a6; display:flex; flex-direction:column; justify-content:center; align-items:center;} .slider .slider-btns{ z-index:11;}</style>`;
document.head.innerHTML += style;

const slideResponsive = (
  selector,
  option = { autoPlay: false, playTime: 0, showBtn: true, isHeader: false }
) => {
  let { autoPlay, playTime, showBtn, isHeader } = option;
  if (document.querySelector(selector) == null)
    return console.error("> El Selector Ingresado No Existe!");
  if (isHeader) document.head.innerHTML += header;

  //creacion
  const slider = document.createElement(
      `slider-${selector.replace(/^[.#>+*/~ ]/g, "")}`
    ),
    contenedor = document.createElement("div"),
    content = document.createElement("div"),
    contenido = document.querySelector(selector),
    contentBtn = document.createElement("div"),
    prev = document.createElement("a"),
    next = document.createElement("a");

  let tamano = contenido.children.length;
  contenedor.classList.add("slider");
  content.classList.add("slider-slides");
  contentBtn.classList.add("slider-btns");
  prev.classList.add("prev");
  next.classList.add("next");
  prev.href = "#";
  next.href = "#";
  Array.from(contenido.children).forEach((el, index) => {
    let slide = document.createElement("div");
    slide.classList.add("slider-slide");
    if (index === 0) slide.classList.add("active");
    Array.from(el.children).forEach((el) => {
      if (el.nodeName === "SPAN") {
        if (el.classList.contains("caption") === false)
          el.classList.add("caption");
      }
    });
    slide.appendChild(el);
    content.appendChild(slide);
  });

  contenedor.appendChild(content);
  if (tamano > 1) {
    if (showBtn == true) {
      contentBtn.appendChild(prev);
      contentBtn.appendChild(next);
      contenedor.appendChild(contentBtn);
    }
  }
  slider.appendChild(contenedor);
  contenido.replaceWith(slider);

  //Funcionamiento
  const nextbtn = document.querySelector(
      `slider-${selector.replace(
        /^[.#>+*/~ ]/g,
        ""
      )} .slider .slider-btns .next`
    ),
    prevbtn = document.querySelector(
      `slider-${selector.replace(
        /^[.#>+*/~ ]/g,
        ""
      )} .slider .slider-btns .prev`
    ),
    slides = document.querySelectorAll(
      `slider-${selector.replace(
        /^[.#>+*/~ ]/g,
        ""
      )} .slider .slider-slides .slider-slide`
    );

  let i = 0;

  document.addEventListener("click", (e) => {
    if (e.target === prevbtn) {
      e.preventDefault();
      slides[i].classList.remove("active");
      i--;
      if (i < 0) i = tamano - 1;
      slides[i].classList.add("active");
    }
    if (e.target === nextbtn) {
      e.preventDefault();
      slides[i].classList.remove("active");
      i++;
      if (i > tamano - 1) i = 0;
      slides[i].classList.add("active");
    }
  });

  if (autoPlay === true && tamano != 0) {
    setInterval(() => {
      slides[i].classList.remove("active");
      i++;
      if (i > tamano - 1) i = 0;
      slides[i].classList.add("active");
    }, (playTime || 3) * 1000);
  }
};

export default slideResponsive;
