import { buildForm, parseResponse } from "@engine/util";

export async function fetchData(user: string, cookie: string) {
    return await parseResponse<{
        pagedProjects: {
            items: {
                favoriterCount: number;
                loverCount: number;
                viewCount: number;
            }[];
            totalItemCount: number;
            totalPageCount: number;
        };
    }>(fetch(`http://gitblock.cn/WebApi/Users/${user}/GetPagedPublishedProjects`, {
        method: "post",
        body: buildForm({}),
        headers: { cookie }
    }));
}