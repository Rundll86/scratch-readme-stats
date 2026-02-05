import { init, run } from ".";

init();
export async function handleRequest(request: Request) {
    return await run(request);
}