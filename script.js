console.log("JS loaded");

document.addEventListener("DOMContentLoaded", () => {

    /* TABS */

  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".project-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      // remove active
      tabs.forEach(btn => btn.classList.remove("active"));
      panels.forEach(panel => panel.classList.remove("active"));

      // activate clicked tab
      tab.classList.add("active");
      document.getElementById(tab.dataset.target).classList.add("active");
    });
  });


  /* PROJECT CAROUSELS */

  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {

    const slides = carousel.querySelector(".slides");
    const images = carousel.querySelectorAll("img");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    let index = 0;
    const total = images.length;

    function updateSlide() {
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % total;
      updateSlide();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + total) % total;
      updateSlide();
    });

  });

  /* DARK MODE */

  const themeSwitcher = document.getElementById("theme-switcher");

  if (themeSwitcher) {

    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      themeSwitcher.querySelector("i").className = "fa-solid fa-sun";
    }

    themeSwitcher.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const icon = themeSwitcher.querySelector("i");
      icon.className = document.body.classList.contains("dark")
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";

      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
      );
    });
  }


  /* SCROLL ANIMATION */

  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease";
    observer.observe(section);
  });

});