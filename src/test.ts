import esa from "./serverless/esa";
import fs from "fs/promises";

async function main() {
    fs.writeFile(
        "output.svg",
        await (
            await esa.fetch(
                new Request("https://baidu.com/?hou=8433&username=awaLiny")
            )
        ).text()
    );
}
main();