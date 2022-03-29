import * as dotenv from 'dotenv';
dotenv.config();
import { StepOne } from './source/StepOne';
import { StepTwo } from './source/StepTwo';
import { StepThree } from './source/StepThree';
import { StepFour } from './source/StepFour';

async function main() {
    try {

        const stepOne = new StepOne();
        await stepOne.execute();
        
        const stepTwo = new StepTwo();
        await stepTwo.execute();
        
        const stepThree = new StepThree();
        await stepThree.execute();

        const stepFour = new StepFour();
        await stepFour.execute();
        
    } catch (err) {
        console.log(err);
    }
}

main();
