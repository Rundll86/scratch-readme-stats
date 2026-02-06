import process from "process";
import esa from "./serverless/esa";
import fs from "fs/promises";

async function main() {
    fs.writeFile(
        "output.svg",
        await (
            await esa.fetch(
                new Request("https://baidu.com/?gitblock=1162371&username=awaLiny", {
                    headers: [
                        ["cookie", "gitblock-auth=E86196748F9E3E3FCACAE4675506676C865DB984653A48FEA1DBC17FC6E3A185B21611AFA068BB715A23DF332919BB43879DA20E9BC7E79EC0F2EAA02F18429D82BDAD8E6C378A9DBD22E8F7BDF1C7DBB5A9608EC79185224FB569916FC88F5C9CDCB9DA1D0960058892AA862887941F69E239A2CDEC81183367641AFD8B338FC81B8F72B974CD671F6071A90DEE07C0D75C466F7D91466D46F03877077925CFC55C9AEC3883EE23B908E91DCBF2602EBEA19A9F4DB6B135A3222BAC7B816B7D9CBDC4FE; gitblock-session-id=fenk4nx5cvyhggswalgvfjls"]
                    ]
                })
            )
        ).text()
    );
}
main();