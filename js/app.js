/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/* Define DOM */
const sections = document.querySelectorAll("section");

/* Start Main Functions */

// Function to make Nav bar
sections.forEach(makeNavbar);

function makeNavbar(element, ind) {
  const list = document.getElementById("navbar__list");
  const fragment = document.createDocumentFragment();
  let listItem = document.createElement("li");
  let navlinks = document.createElement("a");

  listItem.style.paddingLeft = "20px";
  listItem.style.paddingRight = "20px";
  navlinks.style.cursor = "pointer";

  navlinks.classList.add("menu__link");
  let count = ind + 1;
  navlinks.setAttribute("href", `#section${count}`);

  navlinks.addEventListener("click", function clickOnLink(e) {
    e.preventDefault();
    const hrefValue = navlinks.getAttribute("href");
    const scroll = document.querySelector(hrefValue);
    scroll.scrollIntoView({ behavior: "smooth" });
  });

  let itemText = element.getAttribute("data-nav");
  navlinks.innerHTML = itemText;
  listItem.appendChild(navlinks);
  fragment.appendChild(listItem);
  list.appendChild(fragment);
}

// Add Active class to the link
function activeLink(par) {
  let links = document.querySelectorAll("a");
  links.forEach((link) => {
    if (par.getAttribute("data-nav") === link.textContent) {
      let links_2 = document.querySelectorAll("a");
      for (let i = 0; i < links_2.length; i++) {
        links_2[i].classList.remove("activeLink");
      }
      link.classList.add("activeLink");
    }
  });
}

//remove the activeLink class at the top of the page
function removeActiveClass(a) {
  const navLinks = document.querySelectorAll("a");
  navLinks.forEach((link) => {
    if (
      a.getAttribute("data-nav") === link.textContent &&
      link.classList.contains("activeLink") === true
    ) {
      link.classList.remove("activeLink");
    }
  });
}

//Add active class on the current section
function activeSection(element) {
  if (
    element.getBoundingClientRect().bottom > 0 &&
    element.getBoundingClientRect().bottom < 900
  ) {
    sections.forEach((e) => {
      e.classList.remove("your-active-class");
    });
    element.classList.add("your-active-class");
    activeLink(element);
  } else {
    element.classList.remove("your-active-class");
    removeActiveClass(element);
  }
}

// set active class to section
addScrollEvent(activeSection);

function addScrollEvent(activeFunc) {
  window.addEventListener("scroll", () => {
    sections.forEach(activeFunc);
  });
}

// open The menu
function openMenu() {
  let navBar = document.querySelector(".navbar__menu");
  let menu = document.querySelector(".list-menu");
  if (navBar.style.display != "block" && menu.style.display != "none") {
    navBar.style.display = "block";
  } else {
    navBar.style.display = "none";
  }
}

// function to build the menu
buildMenu();

function buildMenu() {
  let header = document.querySelector(".page__header");
  let menu = document.createElement("span");
  menu.classList.add("list-menu");
  for (i = 0; i < 3; i++) {
    let span = document.createElement("span");
    menu.appendChild(span);
  }
  header.appendChild(menu);
  menu.addEventListener("click", openMenu);
}

/* End Main Functions */
