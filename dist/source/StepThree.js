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
exports.processSorted = exports.StepThree = void 0;
const handleFiles_1 = require("../misc/handleFiles");
const fs_1 = require("fs");
const PupeteerCalls_1 = require("../misc/PupeteerCalls");
const chalk_1 = __importDefault(require("chalk"));
const StepThree = () => __awaiter(void 0, void 0, void 0, function* () {
    const stnumber = parseInt(process.env.STR_NUMBER);
    const baseUrl = process.env["BASE_URL"];
    const time2wait = parseInt(process.env["TIME_WAIT"]);
    const log = console.log;
    let counter;
    let timer;
    log(chalk_1.default.yellow("Readding the sortedlist file, ") + chalk_1.default.blue("please wait..."));
    const arrayList = yield (0, handleFiles_1.readFiles)("./downloads/sortedlist.txt");
    stnumber === 0 ? counter = arrayList.length : counter = stnumber;
    time2wait === 0 ? timer = 1000 : timer = time2wait;
    log(chalk_1.default.yellow("Starting the process of writing list files, ") + chalk_1.default.blue("please wait..."));
    const html = new PupeteerCalls_1.PupeteerCalls();
    html.setUrl(baseUrl);
    for (let i = 0; i < counter; i++) {
        const resolve = yield html.thirdCall(arrayList[i], timer);
        const title = resolve.title;
        const data = resolve.html;
        let filepath = `./links/${i}.txt`;
        yield (0, handleFiles_1.writeFiles)(filepath, data);
        log(chalk_1.default.yellow("writing list file ") + chalk_1.default.green(title));
    }
});
exports.StepThree = StepThree;
const processSorted = () => __awaiter(void 0, void 0, void 0, function* () {
    const dir = "./links";
    const list = yield (0, fs_1.readdirSync)(dir).length;
    const tlist = list - 1;
    let bigArray = [];
    let filepath = "./downloads/detailslist.txt";
    for (let i = 0; i < tlist; i++) {
        const data = yield (0, fs_1.readFileSync)(`./links/${i}.txt`, "utf8");
        bigArray = bigArray.concat(JSON.parse(data));
    }
    yield (0, handleFiles_1.writeFiles)(filepath, bigArray);
    console.log("Detail list created.........");
});
exports.processSorted = processSorted;
