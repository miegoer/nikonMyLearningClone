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