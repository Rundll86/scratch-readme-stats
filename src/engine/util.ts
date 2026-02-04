import { GenerateStatus } from "./generator";

export function buildResponse(status: GenerateStatus) {
    if (status.success) {
        return new Response(status.result, {
            status: 200,
            headers: {
                "content-type": "image/svg+xml;charset=UTF-8",
                "cache-control": "public, max-age=3600",
            },
        });
    } else {
        return new Response(status.result, {
            status: 400,
            headers: { "content-type": "text/plain;charset=UTF-8" },
        });
    }
}