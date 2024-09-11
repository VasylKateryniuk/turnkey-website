document.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY;
  let element = document.querySelector(".element_scroll_join");
  if (element) {
    if (scrollPosition > 370) {
      element.style.opacity = 0.92;
    } else {
      element.style.opacity = 0;
    }
  }
});
