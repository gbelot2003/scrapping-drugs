import { StepOne } from './source/StepOne';
import { StepTwo } from './source/StepTwo';

async function main() {
    const stepOne = new StepOne();
    const stepTwo = new StepTwo();

    await stepOne.execute();
    await stepTwo.execute();
}

main();