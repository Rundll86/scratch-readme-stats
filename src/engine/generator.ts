import { compose, templates } from "./composer";
import { CardSetting, CommunityAdapter, getUsernames, Ranks, store, Themes, UserProfile } from "./dataHandler";

export interface AdaptiveResult {
    adapter: CommunityAdapter;
    user: string;
}
export interface GenerateStatus {
    result: string;
    success: boolean;
}
export interface RankRating {
    count: number;
    level: Ranks;
    progress: number;
}
export function reach(request: Request) {
    const url = new URL(request.url);
    const params = url.searchParams;

    const results: AdaptiveResult[] = [];
    for (const adapter of Object.values(store)) {
        const communityUsername = params.get(adapter.fields.username);
        if (communityUsername) {
            results.push({
                adapter,
                user: communityUsername
            });
        }
    }
    return {
        results,
        username: params.get("username") || "Unnamed Developer",
        color: params.get("color") || "#2f80ed",
        theme: (params.get("theme") || "light") as Themes
    };
}
export function generateRating(profile: UserProfile): RankRating {
    const { works, likes, looks } = profile;
    const count: number = likes * 1.2 + works * 0.8 + looks * 0.01;
    let level: Ranks = "E";
    if (count >= 10 && count < 20) level = "D";
    else if (count >= 20 && count < 40) level = "C";
    else if (count >= 40 && count < 70) level = "B";
    else if (count >= 70 && count < 100) level = "B+";
    else if (count >= 100 && count < 150) level = "A";
    else if (count >= 150 && count < 250) level = "A+";
    else if (count >= 250 && count < 300) level = "A++";
    else if (count >= 300 && count < 400) level = "S";
    else if (count >= 400) level = "S+";
    const progress: number = {
        "S+": 1.0,
        "S": 0.9,
        "A++": 0.85,
        "A+": 0.8,
        "A": 0.7,
        "B+": 0.6,
        "B": 0.5,
        "C": 0.3,
        "D": 0.1,
        "E": 0
    }[level];
    return { count, level, progress };
}
export async function generateCard(results: AdaptiveResult[], username: string, setting: CardSetting): Promise<GenerateStatus> {
    try {
        if (results.length === 0) {
            return {
                result: `请提供有效的用户ID参数（${getUsernames().join("、")}）`,
                success: false
            };
        }
        const { color } = setting;
        const { theme } = setting;
        const promises: Promise<UserProfile>[] = [];
        for (const result of results) {
            promises.push((async (adapter) => {
                try {
                    return await adapter.getInfo(result.user);
                } catch (e) {
                    throw new Error(`请求${adapter.communityId}时出错：${e}`);
                }
            })(result.adapter));
        }
        const profiles = await Promise.all(promises);
        const totalProfile = profiles.reduce((pre, cur) => ({
            works: cur.works + pre.works,
            likes: cur.likes + pre.likes,
            looks: cur.looks + pre.looks
        }), {
            works: 0,
            likes: 0,
            looks: 0
        } satisfies UserProfile);
        const { level, progress } = generateRating(totalProfile);
        const progressPercent = progress;
        const totalDash = 251.2;
        const targetOffset = totalDash * (1 - progressPercent);
        const result = compose(templates[theme], {
            ...totalProfile,
            username,
            rankResult: level,
            totalDash,
            targetOffset,
            themeColor: color
        });
        return { result, success: true };
    } catch (e) {
        return { result: `Internal Server Error: ${e}`, success: false };
    }
}