import { defineAdapter } from "@engine/dataHandler";

export default defineAdapter({
    communityName: "Scratch-CN",
    async getInfo() {
        return {
            works: 0,
            likes: 0,
            looks: 0
        };
    },
    fields: {
        username: "sccn"
    }
});