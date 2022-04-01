import { StepOne } from './source/StepOne';
import { StepThree } from './source/StepThree';
import { StepTwo } from './source/StepTwo';


class App {

    private stepOne = new StepOne();
    private stepTwo = new StepTwo();
    private stepThree = new StepThree();
    

    async start() : Promise<void> {
        try {
            await this.stepOne.execute();
            await this.stepTwo.execute();
            await this.stepThree.execute();        
            
            
        } catch (error) {
            console.log(error);
        }
    }
}

const main = new App();
main.start();