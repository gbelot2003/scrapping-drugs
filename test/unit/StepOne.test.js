import puppeteer from "puppeteer";

describe("Test page title and header", () => {
  test("page title", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.drugs.com", { waitUntil: "domcontentloaded" });
    const title = await page.title();
    expect(title).toContain("Drugs.com");
  });
});


