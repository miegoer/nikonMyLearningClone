document.addEventListener("DOMContentLoaded", () => {
  const headerTextElements = document.querySelectorAll('.headerText');

  headerTextElements.forEach((element) => {
    element.addEventListener('mouseover', () => {
      element.style.borderBottom = '5px solid #FFCC00';
      element.style.cursor = 'pointer';
    });
    element.addEventListener('mouseout', () => {
      element.style.borderBottom = 'none';
      element.style.cursor = 'default';
    });
  });
});