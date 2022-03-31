import { HandleFiles } from "../../misc/handleFiles";


const DIR_BASE = path.resolve(__dirname, '__fixtures__/mytestedmodule');

describe('handleFiles', () => {

    it("try the firs", async () => {

        const array: any = ["/alpha/ab.html", "/alpha/ac.html", "/alpha/ad.html"];

        const tester = new HandleFiles();
        
        tester.writeFiles("./test.txt", array);

    })
})
