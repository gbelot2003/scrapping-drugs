let stepOne = require('./stepOne');
let stepTwo = require('./stepTwo');

async function main(){
    try {
        await stepOne();
        await stepTwo();

    } catch (err) {
        console.log(err);
    }
}