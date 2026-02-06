import { defineAdapter } from "@engine/dataHandler";

export default defineAdapter({
    communityName: "希妈阿Q",
    async getInfo() {
        return {
            works: 0,
            likes: 0,
            looks: 0
        };
    },
    fields: {
        username: "momQ"
    }
});