import { StepOne } from './source/StepOne';

async function main() {
    const stepOne = new StepOne();
    await stepOne.execute();
}

main();