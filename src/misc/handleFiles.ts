import { writeFile, readFileSync } from 'fs'
import chalk, { Chalk } from 'chalk';

export class HandleFiles {

    /**
     *  writeFiles
     *  to stringify the text coming from the html of the page
     * @param filePath 
     * @param data 
     */
    public async writeFiles(filePath: string, data: any[]): Promise<void> {
        await writeFile(filePath, JSON.stringify(data), err => {
            if (err) throw console.log(err);
            console.log(`writed file success in ${filePath}` + chalk.cyan(" going to the next step..."));
        });
    }

    /**
     * 
     * @param source 
     * @returns 
     */
    public readFiles(source: string): Promise<any> {
        const data = readFileSync(source, "utf8");
        const prelistArray = data.replace(/g'/, '"');
        const listArray = JSON.parse(prelistArray);
        return listArray;
    }

    
}
