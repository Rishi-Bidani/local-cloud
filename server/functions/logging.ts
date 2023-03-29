import chalk from "chalk";

export enum ApiType {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
}

export default class Logging {
    static async navigate(apitype: ApiType, message: string) {
        console.log((await chalk).green(`[NAVIGATE] ${apitype.toUpperCase()} ${message}`));
    }
    static async download(apitype: ApiType, message: string) {
        console.log((await chalk).blue(`[DOWNLOAD] ${apitype.toUpperCase()} ${message}`));
    }
    static async upload(apitype: ApiType, message: string) {
        console.log((await chalk).yellow(`[UPLOAD] ${apitype.toUpperCase()} ${message}`));
    }
    static async delete(apitype: ApiType, message: string) {
        console.log((await chalk).red(`[DELETE] ${apitype.toUpperCase()} ${message}`));
    }
    static async error(apitype: ApiType, message: string) {
        console.log((await chalk).redBright(`[ERROR] ${apitype.toUpperCase()} ${message}`));
    }
}
