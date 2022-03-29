import puppeteer from "puppeteer";

describe("Testing pupeteer scope", () => {
  test("it can get the title of the target page", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.drugs.com", { waitUntil: "domcontentloaded" });
    const title = await page.title();
    await browser.close();
    expect(title).toContain("Drugs.com");
  });

  test("it can get DOM parts of the target", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.drugs.com", { waitUntil: "domcontentloaded" });

    const element = await page.$eval(".container h1", ele => ele.textContent);

    await browser.close();

    expect(element).toContain("Find Drugs & Conditions");
  });
});
