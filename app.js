let stepOne = require('./stepOne');
let stepTwo = require('./stepTwo');

async function main(){
    try {
        await stepOne.stepOne();
        await stepTwo.stepTwo();
        await stepTwo.processList();
        
    } catch (err) {
        console.log(err);
    }
}

main();