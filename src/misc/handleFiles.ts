import { writeFileSync, readFileSync } from 'fs'

export class HandleFiles {

    /**
     *  writeFiles
     *  to stringify the text coming from the html of the page
     * @param filePath 
     * @param data 
     */
    async writeFiles (filePath: string, data: any[]) : Promise<void> {
        await writeFileSync(filePath, JSON.stringify(data));
        console.log('file written');
    }

    /**
     * readFiles
     * It clear the strings from the difrent lists
     *  
     * @param source 
     * @returns 
     */
    async readFiles (source: string) : Promise<any> {
        const data = readFileSync(source, "utf8");
        data ? console.log("no data") : console.log('data found');
        const prelistArray = data.replace(/g'/, '"');
        const listArray = await JSON.parse(prelistArray);
        return listArray;
    }

}
