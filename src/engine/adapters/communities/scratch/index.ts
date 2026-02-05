import { defineAdapter } from "@engine/dataHandler";

export default defineAdapter({
    communityName: "Scratch官方社区",
    async getInfo(username) {
        const apiUrl = `https://api.scratch.mit.edu/users/${encodeURIComponent(username)}`;
        const response = await fetch(apiUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "application/json",
            },
        });
        if (!response.ok) {
            if (response.status === 404) {
                return { works: 0, likes: 0, looks: 0 };
            }
            throw new Error(`Status: ${response.status}`);
        }
        const projectsUrl = `https://api.scratch.mit.edu/users/${encodeURIComponent(username)}/projects`;
        const projectsResponse = await fetch(projectsUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "application/json",
            },
        });
        if (!projectsResponse.ok) {
            throw new Error(`Status: ${projectsResponse.status}`);
        }
        const projectsData = await projectsResponse.json();
        const works = projectsData.length || 0;
        let likes = 0;
        let looks = 0;
        for (const project of projectsData) {
            likes += project.stats?.loves || 0;
            likes += project.stats?.favorites || 0;
            looks += project.stats?.views || 0;
        }
        return {
            works,
            likes,
            looks,
        };
    },
    fields: {
        username: "scratch",
        rank: {
            system: "scratch",
            store: 2000000
        }
    }
});