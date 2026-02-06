import { defineAdapter } from "@engine/dataHandler";
import { fetchData } from "./data";

export default defineAdapter({
    communityName: "Github",
    async getInfo(user, request) {
        const pat = request.headers.get("Authorization");
        if (!pat) {
            throw new Error("需要鉴权，请携带Github Personal Access Token再请求。");
        }
        const response = await fetchData(user, 1, pat);
        const promises = [];
        for (let i = 0; i < response.maxPage; i++) {
            promises.push((async () => (await fetchData(user, i + 1, pat)).repos)());
        }
        const repos = (await Promise.all(promises)).flat();
        let works = 0;
        let likes = 0;
        let looks = 0;
        for (const repo of repos) {
            if (repo.owner.login === user) {
                works++;
                likes += repo.stargazers_count;
                looks += repo.watchers_count + repo.stargazers_count + repo.forks_count;
            }
        }
        return { works, likes, looks };
    },
    fields: {
        username: "github"
    }
});