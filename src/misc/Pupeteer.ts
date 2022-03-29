

export class PupeteerCalls {

    public _baseUrl: string

    constructor(baseUrl: string){
        this._baseUrl = baseUrl;
    }

    public get getBaseUrl() : string {
        return this._baseUrl;
    } 
}