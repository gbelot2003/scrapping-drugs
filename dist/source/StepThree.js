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
exports.StepThree = void 0;
const handleFiles_1 = require("../misc/handleFiles");
const PupeteerCalls_1 = require("../misc/PupeteerCalls");
const ProcessList_1 = require("../misc/ProcessList");
const chalk_1 = __importDefault(require("chalk"));
class StepThree {
    constructor() {
        this.stnumber = parseInt(process.env.ST_NUMBER);
        this.time2wait = parseInt(process.env["TIME_WAIT"]);
        this.baseUrl = process.env["BASE_URL"];
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let counter;
            let timer;
            console.log(chalk_1.default.yellow("Readding the sortedlist file, ") + chalk_1.default.blue("please wait..."));
            const arrayList = yield (0, handleFiles_1.readFiles)("./downloads/sortedlist.txt");
            this.stnumber === 0 ? counter = arrayList.length : counter = this.stnumber;
            this.time2wait === 0 ? timer = 1000 : timer = this.time2wait;
            console.log(chalk_1.default.yellow("Starting the process of writing list files, ") + chalk_1.default.blue("please wait..."));
            const html = new PupeteerCalls_1.PupeteerCalls();
            html.setUrl(this.baseUrl);
            for (let i = 0; i < counter; i++) {
                const resolve = yield html.thirdCall(arrayList[i], timer);
                const title = resolve.title;
                const data = resolve.html;
                let filepath = `./links/${i}.txt`;
                yield (0, handleFiles_1.writeFiles)(filepath, data);
                console.log(chalk_1.default.yellow("writing list file ") + chalk_1.default.green(title));
            }
            const processList = new ProcessList_1.ProcessList("./links", "./downloads/detailslist.txt");
            processList.process();
            console.log("Detail list created.........");
        });
    }
}
exports.StepThree = StepThree;
