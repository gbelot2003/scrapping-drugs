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
const handleFiles_1 = require("../misc/handleFiles");
const PupeteerCalls_1 = require("../misc/PupeteerCalls");
const ProcessList_1 = require("../misc/ProcessList");
const chalk_1 = __importDefault(require("chalk"));
class StepTwo {
    constructor(dsource = '', source = '') {
        this._stnumber = parseInt(process.env.ST_NUMBER);
        this._time2wait = parseInt(process.env["TIME_WAIT"]);
        this._results = new PupeteerCalls_1.PupeteerCalls();
        this._handle = new handleFiles_1.HandleFiles();
        this.setStorePath(source);
        this.setSourcePath(dsource);
    }
    /**
     * getStorePath
     */
    get getStorePath() {
        return this._storePath;
    }
    /**
     * getSourcePath
     */
    get getSourcePath() {
        return this._sourcePath;
    }
    /**
     * setStorePath
     * Set path for source to store list path
     * @param source
     * @returns
     */
    setStorePath(source = "") {
        if (!source) {
            return this._storePath = "./downloads/sortedlist.txt";
        }
        else {
            return this._storePath = source;
        }
    }
    /**
     * setSourcePath
     * Set path for source list to read
     * @param source
     * @returns
     */
    setSourcePath(source = '') {
        if (!source) {
            return this._sourcePath = "./downloads/masterlist.txt";
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
            console.log(chalk_1.default.yellow("Readding the master list file, ") + chalk_1.default.blue("please wait..."));
            const arrayList = yield this._handle.readFiles(this.getSourcePath);
            this._stnumber === 0 ? counter = arrayList.length : counter = this._stnumber;
            this._time2wait === 0 ? timer = 3000 : timer = this._time2wait;
            console.log(chalk_1.default.yellow("Starting the process of writing list files,") + chalk_1.default.blue(" please wait..."));
            for (let i = 0; i < counter; i++) {
                const resolve = yield this._results.secondCall(arrayList[i], timer);
                const title = resolve.title;
                const data = resolve.html;
                let filepath = `./list/${i}.txt`;
                yield this._handle.writeFiles(filepath, data);
                console.log(chalk_1.default.yellow("writing list ") + chalk_1.default.green(title));
            }
            try {
                const processList = new ProcessList_1.ProcessList("./list", this.getStorePath);
                yield processList.process();
            }
            catch (error) {
                console.log(error);
                process.exit(0);
            }
            console.log(chalk_1.default.yellow("Sorted list created, ") + chalk_1.default.cyan("going to the third step..."));
        });
    }
}
exports.StepTwo = StepTwo;
