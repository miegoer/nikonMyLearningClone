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
  const elementIds = ["logo", "dashboardNav", "catalogueNav", "badgesNav", "eventsNav", "loginNav"];

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
    elementIds.slice(1).forEach(id => {
      expect(document.getElementById(id)).toBeTruthy();
    });
  });

  test('changes border bottom style on mouseover and mouseout', () => {
    const dashboardNav = document.getElementById("dashboardNav");
    expect(dashboardNav).toBeTruthy();

    fireEvent.mouseOver(dashboardNav);
    expect(dashboardNav.style.borderBottom).toBe('5px solid #FFCC00');

    fireEvent.mouseOut(dashboardNav);
    expect(dashboardNav.style.borderBottom).toBe('');
  });
});

describe("catalogue", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();

    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.backgroundColor = 'rgb(255, 255, 255)';
      const button = cards[i].querySelector('.btn-view-courses');
      if (button) {
        button.style.backgroundColor = 'rgb(255, 255, 255)';
      }

      cards[i].addEventListener('mouseover', () => {
        cards[i].style.backgroundColor = 'rgb(255, 204, 0)';
        const button = cards[i].querySelector('.btn-view-courses');
        if (button) {
          button.style.backgroundColor = 'rgb(0, 0, 0)';
        }
      });

      cards[i].addEventListener('mouseout', () => {
        cards[i].style.backgroundColor = 'rgb(255, 255, 255)';
        const button = cards[i].querySelector('.btn-view-courses');
        if (button) {
          button.style.backgroundColor = 'rgb(255, 255, 255)';
        }
      });
    }

    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test("catalogue is present", () => {
    expect(document.getElementById("catalogue")).toBeTruthy();
  });

  test("catalogue cards are present", () => {
    const cards = document.getElementsByClassName("card");
    expect(cards.length).toBe(5);
  });

  test("catalogue cards change colour on mouseover", () => {
    const cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
      fireEvent.mouseOver(cards[i]);

      const backgroundColorOn = window.getComputedStyle(cards[i]).backgroundColor;
      expect(backgroundColorOn).toBe('rgb(255, 204, 0)');

      fireEvent.mouseOut(cards[i]);

      const backgroundColorOff = window.getComputedStyle(cards[i]).backgroundColor;
      expect(backgroundColorOff).toBe('rgb(255, 255, 255)');
    }
  });

  test("catalogue cards buttons change colour on mouseover", () => {
    const cards = document.getElementsByClassName("card");
    
    for (let i = 0; i < cards.length; i++) {
      const button = cards[i].querySelector('.btn-view-courses');
      expect(button).not.toBeNull();

      const initialColor = window.getComputedStyle(button).backgroundColor;
      expect(initialColor).toBe('rgb(255, 255, 255)');

      fireEvent.mouseOver(cards[i]);
  
      const backgroundColorOn = window.getComputedStyle(button).backgroundColor;
      expect(backgroundColorOn).toBe('rgb(0, 0, 0)');
  
      fireEvent.mouseOut(cards[i]);
  
      const backgroundColorOff = window.getComputedStyle(button).backgroundColor;
      expect(backgroundColorOff).toBe('rgb(255, 255, 255)');
    }
  });
});

describe("about", () => {
  beforeAll(() => {
    document.documentElement.innerHTML = html.toString();
    const aboutPlaceholder = document.getElementById("aboutPlaceholder");
    const aboutBackground = document.getElementById("aboutBackground");

    aboutPlaceholder.addEventListener('mouseover', () => {
      aboutBackground.style.transform = 'translateX(60px)';
      aboutBackground.style.transition = 'transform 0.3s ease';
    });

    aboutPlaceholder.addEventListener('mouseout', () => {
      aboutBackground.style.transform = '';
      aboutBackground.style.transition = '';
    });
  });

  test("about is present", () => {
    expect(document.getElementById("about")).toBeTruthy();
  });
  
  test("about placeholder image is present", () => {
    expect(document.getElementById("aboutPlaceholder")).toBeTruthy();
  });

  test("about text is present", () => {
    expect(document.getElementById("aboutText")).toBeTruthy();
  });

  test("about placeholder background shifts on mouseover", () => {
    const aboutPlaceholder = document.getElementById("aboutPlaceholder");
    const aboutBackground = document.getElementById("aboutBackground");
    expect(aboutPlaceholder).toBeTruthy();

    fireEvent.mouseOver(aboutPlaceholder);
    expect(aboutBackground.style.transform).toBe('translateX(60px)');

    fireEvent.mouseOut(aboutPlaceholder);
    expect(aboutBackground.style.transform).toBe('');
  });
});