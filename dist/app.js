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
const StepFour_1 = require("./source/StepFour");
const StepOne_1 = require("./source/StepOne");
const StepThree_1 = require("./source/StepThree");
const StepTwo_1 = require("./source/StepTwo");
class App {
    constructor() {
        this.stepOne = new StepOne_1.StepOne();
        this.stepTwo = new StepTwo_1.StepTwo();
        this.stepThree = new StepThree_1.StepThree();
        this.stepFour = new StepFour_1.StepFour();
    }
    /**
     * Start;
     * Initialize App
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.stepOne.execute();
                yield this.stepTwo.execute();
                yield this.stepThree.execute();
                yield this.stepFour.execute();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const main = new App();
main.start();
