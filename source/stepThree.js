const puppeteer = require("puppeteer");
const fs = require("fs");
const readFiles = require("../misc/readFiles");
const writeFile = require("../misc/writeFiles");

const stepThree = async () => {
    const arrayList = await readFiles("./downloads/sortedlist.txt");
    console.log(arrayList);
};

exports.stepthree = stepThree;