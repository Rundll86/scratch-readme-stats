import esa from "./serverless/esa";
import fs from "fs/promises";

async function main() {
    fs.writeFile(
        "output.svg",
        await (
            await esa.fetch(
                new Request("https://baidu.com/?scratch=griffpatch&username=griffpatch&rankSystem=scratch")
            )
        ).text()
    );
}
main();