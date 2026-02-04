import { init } from ".";
import { generateCard, reach } from "../../generator";
import { buildResponse } from "../../util";

init();
export default {
    async fetch(request: Request) {
        const { results, username, color, theme } = reach(request);
        const status = await generateCard(results, username, { color, theme });
        return buildResponse(status);
    }
};