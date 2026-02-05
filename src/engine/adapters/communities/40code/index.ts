import { defineAdapter } from "@engine/dataHandler";

export default defineAdapter({
    communityName: "40code",
    async getInfo(user) {
        const response = await fetch(`https://api.abc.520gxx.com/work/user?id=${encodeURIComponent(user)}&l=10000&token=`);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        let data = await response.json();
        data = data?.data || [];
        let likes = 0;
        const works = data.length;
        let looks = 0;
        if (works === 0) {
            return { works: 0, likes: 0, looks: 0 };
        }
        for (let i = 0; i < data.length; i++) {
            likes += data[i].like || 0;
            looks += (data[i].look || 0) + (data[i].oldlook || 0);
        }
        return { works, likes, looks };
    },
    fields: {
        username: "code"
    }
});