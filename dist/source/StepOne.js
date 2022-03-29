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
exports.SteepOne = void 0;
const chalk_1 = __importDefault(require("chalk"));
const handleFiles_1 = require("../misc/handleFiles");
const PupeteerCalls_1 = require("../misc/PupeteerCalls");
const SteepOne = () => __awaiter(void 0, void 0, void 0, function* () {
    const log = console.log;
    const initWebsite = process.env["INI_WEBSITE"];
    log(chalk_1.default.yellow("Starting the scanning process,") + chalk_1.default.blue(" please wait..."));
    const pupet = new PupeteerCalls_1.PupeteerCalls();
    pupet.setUrl(initWebsite);
    const html = yield pupet.firstCall();
    log(html);
    yield (0, handleFiles_1.writeFiles)("./downloads/masterlist.txt", html);
    log(chalk_1.default.yellow("Master list created, ") + chalk_1.default.cyan("going to the second step..."));
});
exports.SteepOne = SteepOne;
