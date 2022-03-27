let stepOne = require('./stepOne');
let stepTwo = require('./stepTwo');

async function main(){
    try {
        await stepOne.stepOne();
        await stepTwo.stepTwo().then(() => {
            stepTwo.processList()    
        });
        
    } catch (err) {
        console.log(err);
    }
}

main();