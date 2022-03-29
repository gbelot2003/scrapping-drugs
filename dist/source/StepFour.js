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
exports.StepFour = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const handleFiles_1 = require("../misc/handleFiles");
const StepFour = () => __awaiter(void 0, void 0, void 0, function* () {
    const stnumber = parseInt(process.env.SF_NUMBER);
    const baseUrl = process.env["BASE_URL"];
    console.log("Readding the details list file, please wait......");
    const arrayList = yield (0, handleFiles_1.readFiles)("./downloads/detailslist.txt");
    let counter;
    stnumber === 0 ? counter = arrayList.length : counter = stnumber;
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    console.log("Starting the process of writing dosages files......");
    console.log("depending of configuration this may take a litle long, please wait......");
    for (let i = 0; i < counter; i++) {
        const current = `${baseUrl}${arrayList[i]}`;
        yield page.goto(current, { waitUntil: "networkidle2" });
        const stitle = yield page.title();
        let title = stitle.replace("/", "-");
        const paragraph = yield page.evaluate(() => {
            if (document.querySelector("#dosage") !== null) {
                const status = document.querySelector("#dosage");
                const naam = document.querySelector("div.ddc-related-link");
                return [...document.querySelectorAll("p")]
                    .filter(p => p.compareDocumentPosition(status) &
                    Node.DOCUMENT_POSITION_PRECEDING &&
                    p.compareDocumentPosition(naam) & Node.DOCUMENT_POSITION_FOLLOWING)
                    .map(p => p.textContent);
            }
        });
        let filepath = "./dosages/" + title + ".txt";
        if (paragraph === null || paragraph === undefined || paragraph.length === 0) {
            console.log("No DOM content for this entry ......");
        }
        else {
            console.log("Writing dosage " + title);
            console.log(paragraph);
            (0, handleFiles_1.writeFiles)(filepath, paragraph);
        }
        yield page.waitForTimeout(3000);
    }
    yield browser.close();
});
exports.StepFour = StepFour;
