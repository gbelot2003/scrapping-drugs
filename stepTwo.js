const puppeteer = require("puppeteer");
const readFiles = require("./misc/readFiles");
const writeFile = require("./misc/writefiles");
let i = 0;

const stepTwo = async () => {
  const arrayList = await readFiles("./downloads/masterlist.txt");
  await setTimeout(function() {
    let current = arrayList[i];

    (async (current, i) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(current);

      const html = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".ddc-paging a")).map(
          x => x.href
        );
      });

      let filepath = "./list/" + i + ".txt";

      await writeFile(filepath, html);
      console.log("next list " + i);

      await browser.close();
    })(current, i);

    i++;
    if (i < 5) {
      stepTwo();
    }
  }, 8000);
};

exports.stepTwo = stepTwo;
