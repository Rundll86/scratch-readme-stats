import { defineAdapter } from "@engine/dataHandler";
import { fetchData } from "./data";

export default defineAdapter({
    communityName: "中国少儿编程网",
    async getInfo(user) {
        const response = await fetchData(user, 1);
        const promises = [];
        for (let i = 0; i < response.maxPage; i++) {
            promises.push((async () => (await fetchData(user, i + 1)).projects)());
        }
        const projects = (await Promise.all(promises)).flat();
        let works = 0;
        let likes = 0;
        let looks = 0;
        for (const project of projects) {
            works++;
            likes += project.likes;
            looks += project.looks;
        }
        return { works, likes, looks };
    },
    fields: {
        username: "kidscode"
    }
});