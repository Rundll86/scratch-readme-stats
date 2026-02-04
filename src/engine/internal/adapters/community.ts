import { defineAdapter } from "../../dataHandler";

export const fortyCode = defineAdapter({
    communityId: "40code",
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
export const zeroCat = defineAdapter({
    communityId: "ZeroCat",
    async getInfo(user) {
        const response = await fetch(`https://zerocat-api.houlangs.com/searchapi?search_userid=${encodeURIComponent(user)}&search_orderby=view_up&search_state=public&curr=1&limit=10000`);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        const projects: { star_count?: number }[] = data?.projects || [];
        const works = projects.length;
        const likes = projects.reduce((acc, cur) => acc + (cur.star_count || 0), 0);
        return { works, likes, looks: 0 };
    },
    fields: {
        username: "zc"
    }
});
export const smallBox = defineAdapter({
    communityId: "小盒子社区",
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
export const ccw = defineAdapter({
    communityId: "共创世界",
    async getInfo(user) {
        const response = await fetch("https://community-web.ccw.site/creation/page_by_student?page=1&perPage=1000&sortType=DESC", {
            method: "post",
            body: JSON.stringify({ studentOids: [user] }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status !== 200) {
            throw new Error(`Status: ${data.status}`);
        }
        const workCount = data.body.totalNum;
        let likeCount = 0;
        let lookCount = 0;
        for (const work of data.body.data) {
            likeCount += work.favoriteCount + work.likeCount;
            lookCount += work.viewCount;
        }
        return {
            works: workCount,
            likes: likeCount,
            looks: lookCount
        }
    },
    fields: {
        username: "ccw"
    }
});