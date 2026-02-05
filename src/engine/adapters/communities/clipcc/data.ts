import { parseResponse } from "@engine/util";

export async function fetchProject(id: number) {
    const response = await parseResponse<{
        favorites: number;
        thumbs: number;
    }>(fetch(`https://api.codingclip.com/v1/project/getDetail?id=${id}`));
    const result = response.favorites + response.thumbs;
    return result;
}
export async function fetchUser(user: string, page: number) {
    const response = await parseResponse<{
        projects: {
            id: number;
            plays: number;
        }[];
        pager: {
            quantity: number;
            page: number;
        }
    }>(fetch(`https://api.codingclip.com/v1/project/getUser?user=${user}&limit=20&page=${page}`));
    return response;
}