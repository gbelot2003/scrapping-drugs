import { writeFileSync, readFileSync } from 'fs'

/** write files */
const writeFiles = async (filePath: string, data: any[]) => {
    await writeFileSync(filePath, JSON.stringify(data));
};

/** readFIles files */
const readFiles = async (source: string)  => {

    const data = readFileSync(source, "utf8");
    const prelistArray = data.replace(/g'/, '"');
    const listArray = await JSON.parse(prelistArray);
    return listArray;
    
}

export { writeFiles, readFiles } 