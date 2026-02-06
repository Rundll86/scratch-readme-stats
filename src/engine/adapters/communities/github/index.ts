import { defineAdapter } from "@engine/dataHandler";
import { fetchData } from "./data";

export default defineAdapter({
    communityName: "Github",
    async getInfo(user) {
        const response = await fetchData(user, 1);
        const repos = [];
        for (let i = 0; i < response.maxPage; i++) {
            repos.push(...(await fetchData(user, i + 1)).repos);
        }
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