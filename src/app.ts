import * as dotenv from 'dotenv';
dotenv.config();
import { SteepOne } from './source/StepOne';
import { StepTwo, processList } from './source/StepTwo';
import { StepThree, processSorted } from './source/StepThree';

async function main(){
    try {
        await SteepOne();
        await StepTwo();
        await processList();
        await StepThree();
        await processSorted();
        
    } catch (err) {
        console.log(err);
    }
}

main();
