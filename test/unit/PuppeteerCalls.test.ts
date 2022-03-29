import { PupeteerCalls } from "../../src/misc/Pupeteer";


describe("Testing PuppeteerCalls class", () => {
    let instance: PupeteerCalls;

    beforeEach(() => {
        const baseUrl: string = (process.env["BASE_URL"] as string);
        instance = new PupeteerCalls(baseUrl);
    });

    it('should get the baseUrl property', async () => {
        expect(instance).toBeInstanceOf(PupeteerCalls);
    });

});


