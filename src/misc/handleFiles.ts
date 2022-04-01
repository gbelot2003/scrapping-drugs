import { writeFileSync, readFileSync } from 'fs'
import chalk, { Chalk } from 'chalk';

export class HandleFiles {

    /**
     *  writeFiles
     *  to stringify the text coming from the html of the page
     * @param filePath 
     * @param data 
     */
    public writeFiles(filePath: string, data: any[]): void {
        try {
            writeFileSync(filePath, JSON.stringify(data), 'utf8');    
            console.log('File writted');
        } catch (error) {
            console.log(error);
            process.exit(0);
        }
        
        
    }

    /**
     * 
     * @param source 
     * @returns 
     */
    public readFiles(source: string): Promise<any> {
        console.log(source);
        let listArray: any = [];
        const data = readFileSync(source, "utf8");
        const prelistArray = data.replace(/g'/, '"');
        console.log
        listArray = JSON.parse(prelistArray);
        return listArray;
    }

    
}
