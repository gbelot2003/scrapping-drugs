let stepOne = require('./source/stepOne');
let stepthree = require('./source/stepThree');
let stepTwo = require('./source/stepTwo');

async function main(){
    try {
        //await stepOne.stepOne();
        //await stepTwo.stepTwo();
        await stepTwo.processList();
        await stepthree.stepthree();
        await stepthree.processList();
        
    } catch (err) {
        console.log(err);
    }
}

main();