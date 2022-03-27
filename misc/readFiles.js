const fs = require("fs");

module.exports = async function readFiles(source){
    const data = fs.readFileSync(source, "utf8");
    prelistArray = data.replace(/'/g, '"');
    listArray = await JSON.parse(data);
    return listArray;
} 