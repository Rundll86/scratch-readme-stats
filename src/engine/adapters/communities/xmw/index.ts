import { defineAdapter } from "@engine/dataHandler";
import { parseResponse } from "@engine/util";

export default defineAdapter({
    communityName: "小码王",
    async getInfo(user) {
        const response = await parseResponse<{
            data: {
                total: number;
                list: {
                    statObject: {
                        viewCount: number;
                        collectCount: number;
                        likeCount: number;
                    }
                }[];
            }
        }>(fetch(`https://community-api.xiaomawang.com/api/v1/user/get-composition-list?type=1&userId=${user}&page=1&pageSize=114514&status=-1`));
        const works = response.data.total;
        let likes = 0;
        let looks = 0;
        for (const project of response.data.list) {
            const { viewCount, collectCount, likeCount } = project.statObject;
            likes += collectCount + likeCount;
            looks += viewCount;
        }
        return { works, likes, looks };
    },
    fields: {
        username: "xmw"
    }
});