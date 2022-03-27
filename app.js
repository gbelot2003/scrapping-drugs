let stepOne = require('./source/stepOne');
let stepTwo = require('./source/stepTwo');

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