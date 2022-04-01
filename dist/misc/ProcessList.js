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
exports.ProcessList = void 0;
const fs_1 = require("fs");
const handleFiles_1 = require("./handleFiles");
class ProcessList {
    constructor(directory, filepath) {
        this._directory = directory;
        this._filepath = filepath;
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            const handle = new handleFiles_1.HandleFiles();
            const lists = yield (0, fs_1.readdirSync)(this._directory).length;
            const tlists = (lists - 1);
            let bigArray = [];
            let filepath = this._filepath;
            for (let i = 0; i < tlists; i++) {
                const data = yield (0, fs_1.readFileSync)(`${this._directory}/${i}.txt`, "utf8");
                bigArray = bigArray.concat(JSON.parse(data));
            }
            yield handle.writeFiles(filepath, bigArray);
        });
    }
}
exports.ProcessList = ProcessList;
