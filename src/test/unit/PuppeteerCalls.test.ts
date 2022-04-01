import { PupeteerCalls } from "../../misc/PupeteerCalls";

jest.setTimeout(15000);
describe("testing firstCall", () => {
    test("that it should get baseUrl from environmernt", () => {

        const url: string = (process.env["BASE_URL"] as string);

        const result = new PupeteerCalls();

        expect(result._baseUrl).toBe(url);
    });

    test("it shoult return any array with multiple links", async () => {

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

describe("testing secondCall", () => {
    test("it shoult return any array with multiple links", async () => {

        const url: string = '/alpha/ab.html';

        const call = new PupeteerCalls();

        const result = await call.secondCall(url, 0);

        expect(Array.isArray(result.html)).toBe(true);
    });

    test('it sould return page title', async () => {

        const url: string = '/alpha/a.html';

        const call = new PupeteerCalls();

        const result = await call.secondCall(url, 0);

        expect(result.title).toContain("List of Drugs that start with 'A' - Drugs.com");
    });
});

describe("testing thridCall", () => {
    test("it shoult return any array with multiple links", async () => {

        const url: string = '/alpha/ab.html';

        const call = new PupeteerCalls();

        const result = await call.thirdCall(url, 0);

        expect(Array.isArray(result.html)).toBe(true);
    });

    test('it sould return page title', async () => {

        const url: string = '/alpha/ab.html';

        const call = new PupeteerCalls();

        const result = await call.thirdCall(url, 0);

        expect(result.title).toContain("List of Drugs that start with 'Ab' - Drugs.com");
    });
});

describe("testing fordthCall", () => {
    test("it shoult return any array with multiple links", async () => {

        const url: string = '/cons/a-b-otic.html';

        const call = new PupeteerCalls();

        const result = await call.ForthCall(url, 0);

        expect(Array.isArray(result.paragraph)).toBe(true);
    });

    test('it sould return page title', async () => {
        jest.setTimeout(8000);

        const url: string = '/cons/a-b-otic.html';

        const call = new PupeteerCalls();

        const result = await call.ForthCall(url, 0);

        expect(result.title).toEqual("A-B Otic Advanced Patient Information ");
    });
});