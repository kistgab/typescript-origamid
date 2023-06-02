const allLinks = document.querySelectorAll(".link");

allLinks.forEach((link) => {
  if (link instanceof HTMLElement) {
    toggleElement(link);
  }
});

function toggleElement(element: HTMLElement) {
  element.style.border = "2px solid red";
  element.style.color = "green";
}
