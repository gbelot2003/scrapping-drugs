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
exports.StepOne = void 0;
const chalk_1 = __importDefault(require("chalk"));
const handleFiles_1 = require("../misc/handleFiles");
const PupeteerCalls_1 = require("../misc/PupeteerCalls");
class StepOne {
    constructor() {
        this.handleFiles = new handleFiles_1.HandleFiles();
        this.pupet = new PupeteerCalls_1.PupeteerCalls();
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(chalk_1.default.yellow("Starting the scanning process,") + chalk_1.default.blue(" please wait..."));
            const request = yield this.pupet.firstCall();
            console.log(request.html);
            yield console.log(chalk_1.default.yellow("About to create master list"));
            yield this.handleFiles.writeFiles("./downloads/masterlist.txt", request.html);
        });
    }
}
exports.StepOne = StepOne;
