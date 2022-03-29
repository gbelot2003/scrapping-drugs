const puppeteer = require("puppeteer");
const fs = require("fs");
const readFiles = require("../misc/readFiles");
const writeFile = require("../misc/writeFiles");
const readdirSync = fs.readdirSync;

const stepFour = async (number = 0) => {
  console.log("Readding the details list file, please wait......");
  const arrayList = await readFiles("./downloads/detailslist.txt");

  let counter;

  if(number === 0) {
    counter = arrayList.length;  
  } else {
    counter = number;
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log("Starting the process of writing dosages files......");
  console.log(
    "depending of configuration this may take a litle long, please wait......"
  );

  for (let i = 0; i < 20; i++) {
    const current = arrayList[i];
    await page.goto(current, { waitUntil: "networkidle2" });
    const stitle = await page.title();
    //let title = stitle.split(" ")[0]
    title = stitle.replace("/", "-");

    const paragraph = await page.evaluate(() => {
      if (document.querySelector("#dosage") !== null) {
        const status = document.querySelector("#dosage");
        const naam = document.querySelector("div.ddc-related-link");

        return [...document.querySelectorAll("p")]
          .filter(
            p =>
              p.compareDocumentPosition(status) &
                Node.DOCUMENT_POSITION_PRECEDING &&
              p.compareDocumentPosition(naam) & Node.DOCUMENT_POSITION_FOLLOWING
          )
          .map(p => p.textContent);
      } else {
        paragraph = ["no content"];
      }
    });

    let filepath = "./dosages/" + title + ".txt";

    if (paragraph === null || paragraph === undefined || paragraph === "" || paragraph.length === 0) {
      console.log("No DOM content for this entry ......");
    } else {
      console.log("Writing dosage " + title);
      console.log(paragraph);
      writeFile(filepath, paragraph);
    }

    await page.waitForTimeout(3000);
  }

  await browser.close();
};

exports.stepFour = stepFour;
