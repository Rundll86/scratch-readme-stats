import esa from "./serverless/esa";
import fs from "fs/promises";

async function main() {
    fs.writeFile(
        "output.svg",
        await (
            await esa.fetch(
                new Request("https://baidu.com/?xmw=3972443&username=TestUser")
            )
        ).text()
    );
}
main();