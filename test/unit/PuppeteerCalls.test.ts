import { launch } from "puppeteer";
import { PupeteerCalls } from "../../src/misc/Pupeteer";
import { stubBrowser } from "../../src/test/mockPuppeteer";

jest.mock('puppeteer', () => ({
	launch() {
		return stubBrowser;
	}
}));

beforeEach(() => {
	jest.restoreAllMocks();
});

describe("Testing PuppeteerCalls class", () => {
    let instance: PupeteerCalls;
    const baseUrl: string = (process.env["BASE_URL"] as string);

    beforeEach(() => {
        instance = new PupeteerCalls(baseUrl);
    });

    it('should get the baseUrl property', async () => {
        expect(instance).toBeInstanceOf(PupeteerCalls);
        const url = await instance.getBaseUrl;
        expect(url).toBe(baseUrl);
    });

});


