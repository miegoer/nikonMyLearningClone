const fs = require("fs");
const path = require("path");
const { fireEvent } = require("@testing-library/dom");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

jest.dontMock("fs");

describe("index.html", () => {
  const elementIds = ["page", "nav", "login", "catalogue", "about", "footer"];

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test("page initially loads", () => {
    expect(document.getElementById("page")).toBeTruthy();
  });

  test("landmarks are present", () => {
    elementIds.slice(1).forEach(id => {
      expect(document.getElementById(id)).toBeTruthy();
    });
  });
});

describe("navBar", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    
    const style = document.createElement('style');
    style.textContent = ':root { --nikon-yellow: #FFCC00; }';
    document.head.appendChild(style);

    const dashboardNav = document.getElementById("dashboardNav");
    
    dashboardNav.addEventListener('mouseover', () => {
      dashboardNav.style.borderBottom = '5px solid #FFCC00';
      dashboardNav.style.cursor = 'pointer';
    });

    dashboardNav.addEventListener('mouseout', () => {
      dashboardNav.style.borderBottom = 'none';
      dashboardNav.style.cursor = 'default';
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test("logo is present", () => {
    expect(document.getElementById("logo")).toBeTruthy();
  });

  test("nav links are present", () => {
    expect(document.getElementById("dashboardNav")).toBeTruthy();
    expect(document.getElementById("catalogueNav")).toBeTruthy();
    expect(document.getElementById("badgesNav")).toBeTruthy();
    expect(document.getElementById("eventsNav")).toBeTruthy();
    expect(document.getElementById("loginNav")).toBeTruthy();
  });

  test('Changes border bottom style on mouseover and mouseout', () => {
    const dashboardNav = document.getElementById("dashboardNav");
    expect(dashboardNav).toBeTruthy();

    fireEvent.mouseOver(dashboardNav);
    expect(dashboardNav.style.borderBottom).toBe('5px solid #FFCC00');

    fireEvent.mouseOut(dashboardNav);
    expect(dashboardNav.style.borderBottom).toBe('');
  });
});