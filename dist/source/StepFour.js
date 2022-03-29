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
const handleFiles_1 = require("../misc/handleFiles");
const PupeteerCalls_1 = require("../misc/PupeteerCalls");
const chalk_1 = __importDefault(require("chalk"));
const StepFour = () => __awaiter(void 0, void 0, void 0, function* () {
    const stnumber = parseInt(process.env.SF_NUMBER);
    const time2wait = parseInt(process.env["TIME_WAIT"]);
    const log = console.log;
    let counter;
    let timer;
    log(chalk_1.default.yellow("Readding the details list file, ") + chalk_1.default.blue("please wait..."));
    const arrayList = yield (0, handleFiles_1.readFiles)("./downloads/detailslist.txt");
    stnumber === 0 ? counter = arrayList.length : counter = stnumber;
    time2wait === 0 ? timer = 1000 : timer = time2wait;
    log(chalk_1.default.magenta("Starting the process of writing dosages files......"));
    log(chalk_1.default.magenta("depending of configuration this may take a litle long, please wait......"));
    const html = new PupeteerCalls_1.PupeteerCalls();
    for (let i = 0; i < counter; i++) {
        const resolve = yield html.ForthCall(arrayList[i], timer);
        const title = resolve.title;
        const paragraph = resolve.paragraph;
        let filepath = "./dosages/" + title + ".txt";
        if (paragraph === null || paragraph === undefined || paragraph.length === 0) {
            log(chalk_1.default.red("No DOM content for this entry ......"));
            counter++;
        }
        else {
            log(chalk_1.default.yellow("Writing dosage " + title));
            log(paragraph);
            (0, handleFiles_1.writeFiles)(filepath, paragraph);
        }
    }
    console.log(chalk_1.default.green("Finished process ") + chalk_1.default.greenBright('OK!!'));
});
exports.StepFour = StepFour;
