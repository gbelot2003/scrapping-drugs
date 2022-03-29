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
const puppeteer_1 = __importDefault(require("puppeteer"));
const handleFiles_1 = require("../misc/handleFiles");
const SteepOne = () => __awaiter(void 0, void 0, void 0, function* () {
    const initWebsite = process.env["INI_WEBSITE"];
    console.log("starting the scanning process, please wait...");
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto(initWebsite);
    const html = yield page.evaluate(() => {
        return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.getAttribute('href'));
    });
    yield (0, handleFiles_1.writeFiles)("./downloads/masterlist.txt", html);
    console.log("masterlist created");
    yield browser.close();
});
exports.SteepOne = SteepOne;
