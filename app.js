let stepOne = require('./source/stepOne');
let stepTwo = require('./source/stepTwo');
let stepthree = require('./source/stepThree');
let stepFour = require('./source/stepFour');

async function main(){
    try {
        await stepOne.stepOne();
        await stepTwo.stepTwo();
        await stepTwo.processList();
        await stepthree.stepthree();
        await stepthree.processList();
        await stepFour.stepFour()
        
    } catch (err) {
        console.log(err);
    }
}

main();