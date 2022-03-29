import * as dotenv from 'dotenv';
dotenv.config();
import { SteepOne } from './source/StepOne';
import { StepTwo } from './source/StepTwo';


async function main(){
    try {
        await SteepOne();
        await StepTwo();
        
    } catch (err) {
        console.log(err);
    }
}

main();
