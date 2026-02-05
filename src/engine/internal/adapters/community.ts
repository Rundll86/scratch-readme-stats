import { defineAdapter } from "../../dataHandler";

export const fortyCode = defineAdapter({
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
export const zeroCat = defineAdapter({
    communityName: "ZeroCat",
    async getInfo(user) {
        const response = await fetch(`https://api.zcservice.houlang.cloud/searchapi?search_userid=${encodeURIComponent(user)}&search_orderby=view_up&search_state=public&curr=1&limit=10000`);
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
export const ccw = defineAdapter({
    communityName: "共创世界",
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
        };
    },
    fields: {
        username: "ccw",
        rank: {
            system: "ccw",
            store: 10000000000
        }
    }
});
export const scratch = defineAdapter({
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
export const kernyr = defineAdapter({
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