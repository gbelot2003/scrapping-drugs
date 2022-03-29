"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PupeteerCalls = void 0;
class PupeteerCalls {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }
    get getBaseUrl() {
        return this._baseUrl;
    }
}
exports.PupeteerCalls = PupeteerCalls;
