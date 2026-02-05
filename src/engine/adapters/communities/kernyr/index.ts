import { defineAdapter } from "@engine/dataHandler";

export default defineAdapter({
    communityName: "主核社区",
    async getInfo(user) {
        const response = await fetch(`https://kernyr.wuyuan.dev/u/${user}/summary.json`);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        const workCount = data.topics.length;
        let likeCount = 0;
        let lookCount = 0;
        for (const topic of data.topics) {
            likeCount += topic.like_count;
            lookCount += topic.posts_count;
        }
        return {
            works: workCount,
            likes: likeCount,
            looks: lookCount
        };
    },
    fields: {
        username: "kernyr",
        rank: {
            system: "kernyr",
            store: 15
        }
    }
});