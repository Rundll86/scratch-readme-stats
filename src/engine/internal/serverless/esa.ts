import { init, run } from ".";

init();
export default {
    async fetch(request: Request) {
        return await run(request);
    }
};