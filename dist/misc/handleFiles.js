"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleFiles = void 0;
const fs_1 = require("fs");
class HandleFiles {
    /**
     *  writeFiles
     *  to stringify the text coming from the html of the page
     * @param filePath
     * @param data
     */
    writeFiles(filePath, data) {
        try {
            (0, fs_1.writeFileSync)(filePath, JSON.stringify(data), 'utf8');
            console.log('File writted');
        }
        catch (error) {
            console.log(error);
            process.exit(0);
        }
    }
    /**
     *
     * @param source
     * @returns
     */
    readFiles(source) {
        console.log(source);
        let listArray = [];
        const data = (0, fs_1.readFileSync)(source, "utf8");
        const prelistArray = data.replace(/g'/, '"');
        console.log;
        listArray = JSON.parse(prelistArray);
        return listArray;
    }
}
exports.HandleFiles = HandleFiles;
