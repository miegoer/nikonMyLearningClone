const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let dom;
let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
  dom = new JSDOM(html, { runScripts: "dangerously" });
  document = dom.window.document;
});

describe("index.html", () => {
  test("page initially loads", () => {
    const page = document.getElementById("page");
    expect(page).toBeTruthy();
  });
});