const bodyElement = document.body;
const themeButton = document.querySelector(".fa-moon");
const hamburgerButton = document.querySelector(".fa-bars");

const addThemeClass = (bodyClass, btnClass) => {
  bodyElement.classList.add(bodyClass);
  themeButton.classList.add(btnClass);
};

const savedBodyTheme = localStorage.getItem("portfolio-theme");
const savedBtnTheme = localStorage.getItem("portfolio-btn-theme");

addThemeClass(savedBodyTheme, savedBtnTheme);

const isDarkTheme = () => bodyElement.classList.contains("dark");

const setTheme = (bodyClass, btnClass) => {
  bodyElement.classList.remove(localStorage.getItem("portfolio-theme"));
  themeButton.classList.remove(localStorage.getItem("portfolio-btn-theme"));

  addThemeClass(bodyClass, btnClass);

  localStorage.setItem("portfolio-theme", bodyClass);
  localStorage.setItem("portfolio-btn-theme", btnClass);
};

const toggleTheme = () =>
  isDarkTheme() ? setTheme("light", "fa-moon") : setTheme("dark", "fa-sun");

themeButton.addEventListener("click", toggleTheme);

const displayNavList = () => {
  const navList = document.querySelector(".nav__list");

  if (hamburgerButton.classList.contains("fa-bars")) {
    hamburgerButton.classList.remove("fa-bars");
    hamburgerButton.classList.add("fa-times");
    navList.classList.add("display-nav-list");
  } else {
    hamburgerButton.classList.remove("fa-times");
    hamburgerButton.classList.add("fa-bars");
    navList.classList.remove("display-nav-list");
  }
};

hamburgerButton.addEventListener("click", displayNavList);

const scrollUp = () => {
  const scrollTopButton = document.querySelector(".scroll-top");

  if (bodyElement.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
};

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = {};
  Object.keys(event.target.elements).map((key) => {
    if (isNaN(key)) {
      formData[key] = event.target.elements[key].value;
    }
  });

  fetch("https://httpbin.org/post", {
    method: "POST",
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));
      alert("Contact information successfully submitted!");
    })
    .catch((err) => {
      alert(`Oops!\nSomething went wrong. Please try again after some time.`);
    });
});

const hideRateField = () => {
  document.getElementById("rate").style.display = "none";
};

document.getElementById("question").addEventListener("change", hideRateField);
document.getElementById("comment").addEventListener("change", hideRateField);

const showRateField = () => {
  document.getElementById("rate").style.display = "grid";
};

document.getElementById("hiring").addEventListener("change", showRateField);

document.addEventListener("scroll", scrollUp);
