import { HandleFiles } from '../../misc/handleFiles';
import * as fs from 'fs';

console.error = jest.fn();

describe('handleFiles', () => {
    const expectedPath = `${__dirname}/testfiles/test.txt`;

    afterAll(async () => {
        //await fs.unlinkSync(expectedPath);
    })

    it('writeFiels', async () => {
        let consoleLogSpy = jest.spyOn(console, 'log');
        const expectedPath = `${__dirname}/testfiles/test.txt`;
        const testArray: Array<any> = ["/alpha/a.html", "/alpha/b.html"];
        
        const files: any = new HandleFiles();

        await files.writeFiles(expectedPath, testArray);

        expect(fs.existsSync(expectedPath)).toBeTruthy();
    });
})  