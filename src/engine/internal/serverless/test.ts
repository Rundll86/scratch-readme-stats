import esa from "./esa";
import { handleRequest as edgeone } from "./edgeone";
import fs from "fs/promises";

async function main() {
    fs.writeFile("output-esa.svg", await (await esa.fetch(new Request("https://baidu.com/?code=858"))).text());
    fs.writeFile("output-edgeone.svg", await (await edgeone(new Request("https://baidu.com/?code=858"))).text());
}
main();