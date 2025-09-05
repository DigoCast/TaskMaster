const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement; 
const lightIcon = document.getElementById('lightmode-ico');
const darkIcon = document.getElementById('darkmode-ico');

function setTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  if (newTheme === 'dark') {
    lightIcon.style.display = 'block';
    darkIcon.style.display = 'none';
  } else {
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'block';
  }
});

