import { SteepOne } from './StepOne';

async function main(){
    try {
        await SteepOne();

        
    } catch (err) {
        console.log(err);
    }
}

main();
