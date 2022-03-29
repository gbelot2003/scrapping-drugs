import { readdirSync, readFileSync } from 'fs'
import { writeFiles, readFiles } from './handleFiles';

export class ProcessList {

    protected _directory: string;
    protected _filepath: string;

    constructor(directory: string, filepath: string) {
        this._directory = directory;
        this._filepath = filepath;
    }

    public async process() : Promise<any>{
        const lists: number = await readdirSync(this._directory).length;
        const tlists: number = (lists - 1);
        let bigArray: Array<any> = [];
        let filepath: string = this._filepath;

        for (let i = 0; i < tlists; i++) {
            const data: string = await readFileSync(`${this._directory}/${i}.txt`, "utf8");
            bigArray = bigArray.concat(JSON.parse(data));
        }

        await writeFiles(filepath, bigArray);
    }

}