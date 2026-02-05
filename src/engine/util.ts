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
export async function parseResponse<T>(response: Promise<Response>, checkStatus?: string): Promise<T> {
    const responsed = await response;
    if (!responsed.ok) {
        throw new Error(`Status: ${responsed.status}`);
    }
    try {
        const data = await responsed.json();
        if (checkStatus) {
            if (data[checkStatus] !== 200) {
                throw new Error(`API Responsed status: ${data[checkStatus]}`);
            }
        }
        return data;
    } catch (e) {
        throw new Error(`Error parsing json: ${e}`);
    }
}
export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}