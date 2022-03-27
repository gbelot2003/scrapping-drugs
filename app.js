let stepOne = require('./source/stepOne');
let stepTwo = require('./source/stepTwo');
let stepthree = require('./source/stepThree');
let stepFour = require('./source/stepFour');

async function main(){
    try {
        await stepOne.stepOne();
        await stepTwo.stepTwo(5);
        await stepTwo.processList();
        await stepthree.stepthree(10);
        await stepthree.processList();
        await stepFour.stepFour(20)
        
    } catch (err) {
        console.log(err);
    }
}

main();