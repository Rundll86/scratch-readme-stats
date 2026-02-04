import esa from "./serverless/esa";
import { handleRequest as edgeone } from "./serverless/edgeone";
import fs from "fs/promises";

async function main() {
    fs.writeFile(
        "output-esa.svg",
        await (await esa.fetch(new Request(
            "https://baidu.com/?ccw=610b508176415b2f27e0f851&username=酷可MC&rankSystem=ccw"
        ))).text());
    fs.writeFile(
        "output-edgeone.svg",
        await (await edgeone(new Request(
            "https://baidu.com/?ccw=610b508176415b2f27e0f851"
        ))).text()
    );
}
main();