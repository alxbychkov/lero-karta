const sections = [...document.querySelectorAll("section")];

let options = {
  rootMargin: "0px",
  threshold: 0.75,
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    const { target } = entry;

    if (entry.intersectionRatio >= 0.75) {
      target.classList.add("is-visible");
    } else {
      target.classList.remove("is-visible");
    }
  });
};

const observer = new IntersectionObserver(callback, options);

sections.forEach((section, index) => {
  const sectionChildren = [...section.querySelector("[data-content]").children];

  sectionChildren.forEach((el, index) => {
    el.style.setProperty("--delay", `${index * 250}ms`);
  });

  observer.observe(section);
});

const burger = document.querySelector(".burger");
const nav = document.querySelector(".sidebar-nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    if (burger.classList.contains("open")) {
      burger.classList.remove("open");
      nav.classList.remove("open");
    } else {
      burger.classList.add("open");
      nav.classList.add("open");
    }
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth < 991) {
    if (burger && nav) {
      if (burger.classList.contains("open")) {
        burger.classList.remove("open");
        nav.classList.remove("open");
      }
    }
  }
});

const arrow = document.querySelector('.arrow');

if (arrow) {
  arrow.addEventListener('click', () => {
    const visibleSection = document.querySelector('.section.is-visible');
    const nextSection = visibleSection ? visibleSection.nextElementSibling : undefined;

    if (nextSection) {
      const href = nextSection.id;
      const link = document.querySelector(`a[href="#${href}"`);

      link && link.click();
    }
  });
}
