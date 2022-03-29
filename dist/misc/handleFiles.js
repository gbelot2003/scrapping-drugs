"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class handleFiles {
    constructor(filepath, data) {
        this.filePath = filepath;
        this.localData = data;
    }
    WriteFile() {
        (0, fs_1.writeFileSync)(this.filePath, JSON.stringify(this.localData));
    }
    ReadFile() {
        let data;
        let prelist;
        let listArray;
        data = (0, fs_1.readFileSync)(this.filePath, "utf8");
        prelist = data.replace(/'/g, '"');
        listArray = JSON.parse(prelist);
        return listArray;
    }
}
