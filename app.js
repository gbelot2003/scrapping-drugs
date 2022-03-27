let stepOne = require('./stepOne');

async function main(){
    try {
        await stepOne();

    } catch (err) {
        console.log(err);
    }
}