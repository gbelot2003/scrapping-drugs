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
const handleFiles_1 = require("../misc/handleFiles");
const stepThree = () => __awaiter(void 0, void 0, void 0, function* () {
    const stnumber = parseInt(process.env.STR_NUMBER);
    const baseUrl = process.env["BASE_URL"];
    console.log("Readding the sortedlist file, please wait......");
    const arrayList = yield (0, handleFiles_1.readFiles)("./downloads/sortedlist.txt");
    let counter;
});
exports.stepthree = stepThree;
