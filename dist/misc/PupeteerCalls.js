"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.PupeteerCalls = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class PupeteerCalls {
    constructor() {
        this._baseUrl = process.env["BASE_URL"];
    }
    get getBaseUrl() {
        return this._baseUrl;
    }
    /**
     *
     * @returns
     */
    firstCall() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.goto(`${this.getBaseUrl}/drug_information.html`, { waitUntil: 'networkidle2', timeout: 60000 });
            const title = yield page.title();
            const html = yield page.evaluate(() => {
                return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.getAttribute('href'));
            });
            yield page.close();
            yield browser.close();
            return { html, title };
        });
    }
    /**
     *
     * @param url
     * @param timer
     * @returns
     */
    secondCall(url, timer) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            const current = `${this.getBaseUrl}${url}`;
            yield page.goto(current, { waitUntil: 'networkidle2', timeout: 60000 });
            const title = yield page.title();
            const html = yield page.evaluate(() => {
                return Array.from(document.querySelectorAll(".ddc-paging a")).map(x => x.getAttribute('href'));
            });
            yield page.waitForTimeout(timer);
            yield page.close();
            yield browser.close();
            return { html, title };
        });
    }
    /**
     *
     * @param url
     * @param timer
     * @returns
     */
    thirdCall(url, timer) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            const current = `${this.getBaseUrl}${url}`;
            yield page.goto(current, { waitUntil: "networkidle2", timeout: 60000 });
            const html = yield page.evaluate(() => {
                return Array.from(document.querySelectorAll(".ddc-list-column-2 a")).map(x => x.getAttribute('href'));
            });
            const title = yield page.title();
            yield page.waitForTimeout(timer);
            yield page.close();
            yield browser.close();
            return { html, title };
        });
    }
    /**
   * ForthCall
   * @param url
   * @param timer
   * @returns
   */
    ForthCall(url, timer) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            const current = `${this.getBaseUrl}${url}`;
            yield page.goto(current, { waitUntil: 'networkidle2', timeout: 60000 });
            const stitle = yield page.title();
            const rtitle = stitle.replace("- Drugs.com", "");
            let title = rtitle.replace("/", "-");
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
            yield page.waitForTimeout(timer);
            yield page.close();
            yield browser.close();
            return { title, paragraph };
        });
    }
}
exports.PupeteerCalls = PupeteerCalls;
