const puppeteer = require("puppeteer");
const fs = require("fs");
const readFiles = require("../misc/readFiles");
const writeFile = require("../misc/writeFiles");
const readdirSync = fs.readdirSync;

const stepThree = async () => {
  console.log("Readding the sortedlist file, please wait......");
  const arrayList = await readFiles("./downloads/sortedlist.txt");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log("Starting the process of writing list files, please wait......");
  for (let i = 0; i < 5; i++) {
    const current = arrayList[i];
    console.log(current);
    await page.goto(current, { waitUntil: "networkidle2" });
    const html = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".ddc-list-column-2 a")).map(
        x => x.href
      );
    });
    const stitle = await page.title();
    let title = stitle.match(/'([^']+)'/)[1];
    console.log(title);
    let filepath = "./links/" + i + ".txt";
    await writeFile(filepath, html);
    console.log("writing list file " + title);
    await page.waitForTimeout(3000);
  }
  await browser.close();
};

const processList = async () => {
  const dir = "./links";
  const lists = await readdirSync(dir).length;
  const tlist = lists - 1;
  let bigArray = [];
  let filepath = "./downloads/detailslist.txt";

  for (let i = 0; i < tlist; i++) {
    const data = await fs.readFileSync("./links/" + i + ".txt", "utf8");
    bigArray = bigArray.concat(JSON.parse(data));
  }

  await writeFile(filepath, bigArray);
  console.log("Detail list created.........");
};

exports.stepthree = stepThree;
exports.processList = processList;
