import { defineAdapter } from "@engine/dataHandler";

export default defineAdapter({
    communityName: "小盒子社区",
    async getInfo(user) {
        const cleanName = encodeURIComponent(user.trim());
        const response = await fetch(`https://sbox.yearnstudio.cn/api/user/ue?user=${cleanName}`);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || typeof data.total_works !== "number") {
            return { works: 0, likes: 0, looks: 0 };
        }
        const totalLikes = (data.likes || 0) + (data.stars || 0);
        return {
            works: data.total_works || 0,
            likes: totalLikes,
            looks: data.views || 0
        };
    },
    fields: {
        username: "sbox"
    }
});