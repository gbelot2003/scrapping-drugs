import * as dotenv from 'dotenv';
dotenv.config();
import { StepOne } from './source/StepOne';
import { StepTwo } from './source/StepTwo';
import { StepThree, processSorted } from './source/StepThree';
import { StepFour } from './source/StepFour';

async function main() {
    try {

        const stepOne = new StepOne();
        stepOne.execute();
        const stepTwo = new StepTwo();
        stepTwo.execute();
        await StepThree();
        await processSorted();
        await StepFour();
    } catch (err) {
        console.log(err);
    }
}

main();
