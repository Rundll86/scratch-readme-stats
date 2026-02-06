import { defineAdapter } from "@engine/dataHandler";
import { parseResponse } from "@engine/util";

export default defineAdapter({
    communityName: "稽木世界",
    async getInfo(user) {
        const response = await parseResponse(fetch(`http://gitblock.cn/WebApi/Users/${user}/GetPagedPublishedProjects`), "json");
        console.log(response);
        return {
            works: 0,
            likes: 0,
            looks: 0
        }
    },
    fields: {
        username: "gitblock"
    }
});