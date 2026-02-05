import { defineAdapter } from "@engine/dataHandler";
import { fetchProject, fetchUser } from "./data";

export default defineAdapter({
    communityName: "ClipCC",
    async getInfo(user) {
        const response = await fetchUser(user, 1);
        const promises = [];
        let looks = 0;
        const likesPromises: number[] = [];
        for (let i = 0; i < response.pager.page; i++) {
            promises.push((async () => {
                const response = await fetchUser(user, i + 1);
                const pageLikesPromises = [];
                for (const project of response.projects) {
                    looks += project.plays;
                    pageLikesPromises.push(fetchProject(project.id));
                }
                const pageLikes = await Promise.all(pageLikesPromises);
                likesPromises.push(...pageLikes);
            })());
        }
        await Promise.all(promises);
        const likes = likesPromises.reduce((sum, value) => sum + value, 0);
        return {
            works: response.pager.quantity,
            looks,
            likes
        };
    },
    fields: {
        username: "clipcc"
    }
});