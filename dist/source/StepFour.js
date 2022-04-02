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
class StepFour {
    constructor(dsource = '') {
        this._stnumber = parseInt(process.env.SF_NUMBER);
        this._time2wait = parseInt(process.env["TIME_WAIT"]);
        this._results = new PupeteerCalls_1.PupeteerCalls();
        this._handle = new handleFiles_1.HandleFiles();
        this.setSourcePath(dsource);
    }
    /**
     * getSourcePath
     */
    get getSourcePath() {
        return this._sourcePath;
    }
    /**
     * setSourcePath
     * Set path for source list to read
     * @param source
     * @returns
     */
    setSourcePath(source = '') {
        if (!source) {
            return this._sourcePath = "./downloads/detailslist.txt";
        }
        else {
            return this._sourcePath = source;
        }
    }
    /**
     * Execute
     * Method to execure the class
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let counter;
            let timer;
            console.log(chalk_1.default.yellow("Readding the details list file, ") + chalk_1.default.blue("please wait..."));
            const arrayList = yield this._handle.readFiles(this.getSourcePath);
            this._stnumber === 0 ? counter = arrayList.length : counter = this._stnumber;
            this._time2wait === 0 ? timer = 1000 : timer = this._time2wait;
            console.log(chalk_1.default.magenta("Starting the process of writing dosages files......"));
            console.log(chalk_1.default.magenta("depending of configuration this may take a litle long, please wait......"));
            for (let i = 0; i < counter; i++) {
                const resolve = yield this._results.ForthCall(arrayList[i], timer);
                const title = resolve.title;
                const paragraph = resolve.paragraph;
                let filepath = "./dosages/" + title + ".txt";
                if (paragraph === null || paragraph === undefined || paragraph.length === 0) {
                    console.log(chalk_1.default.red("No DOM content for this entry, ") + chalk_1.default.green('adding one loop to compensate....'));
                    counter++;
                }
                else {
                    console.log(chalk_1.default.yellow("Writing dosage " + title));
                    console.log(paragraph);
                    this._handle.writeFiles(filepath, paragraph);
                }
            }
            console.log(chalk_1.default.green("Finished process ") + chalk_1.default.greenBright('OK!!'));
            process.exit(0);
        });
    }
}
exports.StepFour = StepFour;
