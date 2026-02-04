import { registerAdapter } from "../../dataHandler";
import { reach, generateCard } from "../../generator";
import { getRankStores } from "../../rankHandler";
import { buildResponse } from "../../util";
import { fortyCode, zeroCat, smallBox, ccw } from "../adapters/community";

export function init() {
    registerAdapter(fortyCode, zeroCat, smallBox, ccw);
}
export async function run(request: Request) {
    const { results, username, color, theme, store } = reach(request);
    if (!store) {
        return buildResponse({
            result: `评分系统无效，请从${getRankStores().join("、")}中选择一个`,
            success: false
        });
    }
    const status = await generateCard(results, username, { color, theme }, store);
    return buildResponse(status);
}