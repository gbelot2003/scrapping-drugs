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
exports.readFiles = exports.writeFiles = void 0;
const fs_1 = require("fs");
/** write files */
const writeFiles = (filePath, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, fs_1.writeFileSync)(filePath, JSON.stringify(data));
});
exports.writeFiles = writeFiles;
/** readFIles files */
const readFiles = (source) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, fs_1.readFileSync)(source, "utf8");
    const prelistArray = data.replace(/g'/, '"');
    const listArray = yield JSON.parse(prelistArray);
    return listArray;
});
exports.readFiles = readFiles;
