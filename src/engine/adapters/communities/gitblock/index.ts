import { defineAdapter } from "@engine/dataHandler";
import { fetchData } from "./data";

export default defineAdapter({
    communityName: "稽木世界",
    async getInfo(user, request) {
        const cookie = request.headers.get("cookie");
        if (!cookie) {
            throw new Error("需要鉴权，请携带稽木世界鉴权cookie再请求。");
        }
        const response = await fetchData(user, cookie);
        let works = response.pagedProjects.totalItemCount;
        const promises = [];
        for (let i = 0; i < response.pagedProjects.totalPageCount; i++) {
            promises.push((async () => {
                const response = await fetchData(user, cookie);
                let likes = 0;
                let looks = 0;
                for (const project of response.pagedProjects.items) {
                    likes += project.loverCount + project.favoriterCount;
                    looks += project.viewCount;
                }
                return { likes, looks };
            })());
        }
        const datas = await Promise.all(promises);
        return {
            works,
            ...datas.reduce((prev, cur) => ({
                likes: prev.likes + cur.likes,
                looks: prev.looks + cur.looks
            }), {
                likes: 0,
                looks: 0
            })
        };
    },
    fields: {
        username: "gitblock"
    }
});