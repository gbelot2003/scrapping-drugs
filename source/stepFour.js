const puppeteer = require("puppeteer");
const fs = require("fs");
const readFiles = require("../misc/readFiles");
const writeFile = require("../misc/writeFiles");
const readdirSync = fs.readdirSync;

const stepFour = async () => {
  console.log("Readding the details list file, please wait......");
  const arrayList = await readFiles("./downloads/detailslist.txt");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log("Starting the process of writing dosages files......");
  console.log(
    "depending of configuration this may take a litle long, please wait......"
  );

  for (let i = 0; i < 5; i++) {
    const current = arrayList[i];
    console.log(current);
    await page.goto(current, { waitUntil: "networkidle2" });
    const stitle = await page.title();
    let title = stitle.split(" ")[0]
    title = title.replace('/','-');

    const paragraph = await page.evaluate(() => {
      const status = document.querySelector("h2#dosage");
      const naam = document.querySelector("div.ddc-related-link");

      return [...document.querySelectorAll("p")]
        .filter(
          p =>
            p.compareDocumentPosition(status) &
              Node.DOCUMENT_POSITION_PRECEDING &&
            p.compareDocumentPosition(naam) & Node.DOCUMENT_POSITION_FOLLOWING
        )
        .map(p => p.innerText);
    });
    
    let filepath = "./dosages/" + title + ".txt";
    console.log("Writing dosage "+ title );
    await writeFile(filepath, paragraph);
    await page.waitForTimeout(7000);
  }
  
  await browser.close();
};

exports.stepFour = stepFour;
