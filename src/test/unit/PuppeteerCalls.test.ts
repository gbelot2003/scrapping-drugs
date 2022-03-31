import { PupeteerCalls } from "../../misc/PupeteerCalls";


describe("PupeteerCalls", () => {
    test("that it should get baseUrl from environmernt", () => {
        const url: string = (process.env["INI_WEBSITE"] as string);

        const result =  new PupeteerCalls();

        expect(result._baseUrl).toBe(url);
    });

 

    test("it shoult return any array with multiple links", async () =>{

        const call = new PupeteerCalls();

        const result = await call.firstCall();

        expect(Array.isArray(result.html)).toBe(true);

    });

    test('it sould return page title', async () => {

        const call = new PupeteerCalls();

        const result = await call.firstCall();

        expect(result.title).toBe("A - Z Drug List from Drugs.com");

    });


});

