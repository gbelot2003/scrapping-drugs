"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepTwo = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const handleFiles_1 = require("../misc/handleFiles");
const StepTwo = () => __awaiter(void 0, void 0, void 0, function* () {
    const stnumber = parseInt(process.env.ST_NUMBER);
    const baseUrl = process.env["BASE_URL"];
    console.log("Readding the masterlist file, please wait......");
    const arrayList = yield (0, handleFiles_1.readFiles)("./downloads/masterlist.txt");
    let counter;
    stnumber === 0 ? counter = arrayList.length : counter = stnumber;
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    console.log("Starting the process of writing list files, please wait......");
    for (let i = 0; i < counter; i++) {
        const current = `${baseUrl}${arrayList[i]}`;
        yield page.goto(current, { waitUntil: "networkidle2" });
        const html = yield page.evaluate(() => {
            return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.getAttribute('href'));
        });
        let filepath = "./list/" + i + ".txt";
        yield (0, handleFiles_1.writeFiles)(filepath, html);
        console.log("writing list number " + i);
        yield page.waitForTimeout(3000);
    }
});
exports.StepTwo = StepTwo;
