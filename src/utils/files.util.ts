import * as fs from "fs";

export const createDir = (path:string):void => fs.mkdirSync(`${path}`);
export const readDir = (path:string):string[] => fs.readdirSync(path);
export const isExist = (path:string):boolean => fs.existsSync(path);
export const readFile = (path: string) => fs.readFileSync(path);
