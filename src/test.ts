import esa from "./serverless/esa";
import fs from "fs/promises";

async function main() {
    fs.writeFile(
        "output.svg",
        await (
            await esa.fetch(
                new Request("https://baidu.com/?kernyr=wuyuan&username=孙悟元&rankSystem=kernyr")
            )
        ).text()
    );
}
main();