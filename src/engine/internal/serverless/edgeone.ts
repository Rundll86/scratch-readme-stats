import { init } from ".";
import { reach, generateCard } from "../../generator";
import { buildResponse } from "../../util";

init();
export async function handleRequest(request: Request) {
    const { results, username, color, theme } = reach(request);
    const status = await generateCard(results, username, { color, theme });
    return buildResponse(status);
}