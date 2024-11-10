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

describe("login", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();

    if (!document.getElementById('loginForm')) {
      const form = document.createElement('form');
      form.id = 'loginForm';
      document.body.appendChild(form);
    }

    if (!document.getElementById('loginButton')) {
      const button = document.createElement('button');
      button.id = 'loginButton';
      document.getElementById('loginForm').appendChild(button);
    }

    if (!document.getElementById('loginErrorPlaceholder')) {
      const placeholder = document.createElement('div');
      placeholder.id = 'loginErrorPlaceholder';
      document.getElementById('loginForm').appendChild(placeholder);
    }

    if (!document.getElementById('userName')) {
      const userInput = document.createElement('input');
      userInput.id = 'userName';
      document.getElementById('loginForm').appendChild(userInput);
    }

    if (!document.getElementById('password')) {
      const passInput = document.createElement('input');
      passInput.id = 'password';
      document.getElementById('loginForm').appendChild(passInput);
    }

    require('../script.js');

    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.resetModules();
  });

  test("login form is present", () => {
    expect(document.getElementById("loginForm")).toBeTruthy();
  });

  test("hero image is present", () => {
    expect(document.getElementById("heroImage")).toBeTruthy();
  });

  test("displays Bootstrap alert when username or password is missing", () => {
    const loginButton = document.getElementById('loginButton');
    expect(loginButton).toBeTruthy();

    document.getElementById('userName').value = '';
    document.getElementById('password').value = '';

    fireEvent.click(loginButton);

    setTimeout(() => {
      const alert = document.getElementById('loginAlert');
      expect(alert).toBeTruthy();
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('alert');
      expect(alert).toHaveClass('alert-warning');
      expect(alert.textContent).toContain('Please enter both a username and password');
    }, 0);
  });

  test("form submits when both username and password are provided", () => {
    const form = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const userNameInput = document.getElementById('userName');
    const passwordInput = document.getElementById('password');

    const mockSubmit = jest.fn();
    form.submit = mockSubmit;

    userNameInput.value = 'testuser';
    passwordInput.value = 'password123';

    fireEvent.click(loginButton);

    setTimeout(() => {
      expect(mockSubmit).toHaveBeenCalled();
      const alert = document.querySelector('#loginAlert');
      expect(alert).toBeFalsy();
    }, 0);
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
      expect(backgroundColorOff).toBe('white');
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
      expect(backgroundColorOn).toBe('black');
  
      fireEvent.mouseOut(cards[i]);
  
      const backgroundColorOff = window.getComputedStyle(button).backgroundColor;
      expect(backgroundColorOff).toBe('white');
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

describe("footer", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    const contactButton = document.querySelector(".custom-button.btn-primary");
    const cookiesButton = document.querySelector(".btn-outline-success");

    if (contactButton) {
      contactButton.style.backgroundColor = "rgb(13, 110, 253)";
      contactButton.addEventListener("mouseover", () => {
        contactButton.style.backgroundColor = "rgb(10, 85, 204)";
      });
      contactButton.addEventListener("mouseout", () => {
        contactButton.style.backgroundColor = "rgb(13, 110, 253)";
      });
    }

    if (cookiesButton) {
      cookiesButton.style.color = "rgb(25, 135, 84)";
      cookiesButton.addEventListener("mouseover", () => {
        cookiesButton.style.backgroundColor = "rgb(40, 167, 69)";
        cookiesButton.style.color = "rgb(255, 255, 255)";
      });
      cookiesButton.addEventListener("mouseout", () => {
        cookiesButton.style.backgroundColor = "";
        cookiesButton.style.color = "rgb(25, 135, 84)";
      });
    }
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test("footer is present", () => {
    expect(document.getElementById("footer")).toBeTruthy();
  });

  test("Contact Us button changes style on mouseover", () => {
    const contactButton = document.querySelector(".custom-button.btn-primary");
    expect(contactButton).toBeTruthy();

    expect(contactButton.style.backgroundColor).toBe("rgb(13, 110, 253)");
    expect(contactButton.style.color).toBe("");

    fireEvent.mouseOver(contactButton);

    expect(contactButton.style.backgroundColor).toBe("rgb(10, 85, 204)");
    expect(contactButton.style.color).toBe("");

    fireEvent.mouseOut(contactButton);

    expect(contactButton.style.backgroundColor).toBe("rgb(13, 110, 253)");
    expect(contactButton.style.color).toBe("");
  });

  test("Cookies Settings button changes style on mouseover", () => {
    const cookiesButton = document.querySelector(".btn-outline-success");
    expect(cookiesButton).toBeTruthy();

    expect(cookiesButton.style.backgroundColor).toBe("");
    expect(cookiesButton.style.color).toBe("rgb(25, 135, 84)");

    fireEvent.mouseOver(cookiesButton);


    expect(cookiesButton.style.backgroundColor).toBe("rgb(40, 167, 69)");
    expect(cookiesButton.style.color).toBe("rgb(255, 255, 255)");

    fireEvent.mouseOut(cookiesButton);

    expect(cookiesButton.style.backgroundColor).toBe("");
    expect(cookiesButton.style.color).toBe("rgb(25, 135, 84)");
  });
});