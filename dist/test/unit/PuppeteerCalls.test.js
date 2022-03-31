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
Object.defineProperty(exports, "__esModule", { value: true });
const PupeteerCalls_1 = require("../../misc/PupeteerCalls");
describe("PupeteerCalls", () => {
    test("that it should get baseUrl from environmernt", () => __awaiter(void 0, void 0, void 0, function* () {
        const url = process.env["INI_WEBSITE"];
        const result = new PupeteerCalls_1.PupeteerCalls();
        expect(result._baseUrl).toBe(url);
    }));
    test("it should return a page title", () => __awaiter(void 0, void 0, void 0, function* () {
        const call = new PupeteerCalls_1.PupeteerCalls();
        yield call.firstCall();
        const result = call.title;
        expect(result).toBe("A - Z Drug List from Drugs.com");
    }));
    test("it shoult return any array with multiple links", () => __awaiter(void 0, void 0, void 0, function* () {
        const call = new PupeteerCalls_1.PupeteerCalls();
        const result = yield call.firstCall();
        expect(Array.isArray(result)).toBe(true);
    }));
});
