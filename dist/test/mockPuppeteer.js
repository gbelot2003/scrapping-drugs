"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockStubElementHandle = exports.mockStubPuppeteer = exports.mockStubBrowser = exports.mockStubPage = void 0;
exports.mockStubPage = {
    goto(url) {
        return Promise.resolve();
    },
    $$(selector) {
        return Promise.resolve([]);
    },
    $(selector) {
        return Promise.resolve();
    },
    $eval(selector, pageFunction) {
        return Promise.resolve();
    },
    evaluate(selector, pageFunction) {
        return Promise.resolve([]);
    }
};
exports.mockStubBrowser = {
    newPage() {
        return Promise.resolve(exports.mockStubPage);
    },
    close() {
        return Promise.resolve();
    }
};
exports.mockStubPuppeteer = {
    launch() {
        return Promise.resolve(exports.mockStubBrowser);
    }
};
exports.mockStubElementHandle = {
    $eval() {
        console.log('stub element handle');
        return Promise.resolve();
    }
};
