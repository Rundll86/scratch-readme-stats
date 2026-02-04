async function handleRequest(request) {
    return new Response("Hello World!");
}

export default {
    async fetch(request) {
        return handleRequest(request);
    }
};