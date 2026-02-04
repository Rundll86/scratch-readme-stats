export interface UserProfile {
    works: number;
    likes: number;
    looks: number;
}
export interface CardInfo {
    username: string;
    rankResult: Ranks;
}
export interface CardStyle {
    totalDash: number;
    targetOffset: number;
    themeColor: string;
}
export type Themes = "dark" | "light";
export interface CardSetting {
    theme: Themes;
    color: string;
}
export interface UserProfileHandler {
    (user: string): Promise<UserProfile>;
}
export interface CommunityAdapter {
    communityId: string;
    getInfo: UserProfileHandler;
    fields: Record<"username", string>;
}
export type Ranks = "S+" | "S" | "A++" | "A+" | "A" | "B+" | "B" | "C" | "D" | "E";

export const store: Record<string, CommunityAdapter> = {};
export function defineAdapter(data: CommunityAdapter) {
    return data;
}
export function registerAdapter(...adapters: CommunityAdapter[]) {
    for (const adapter of adapters) {
        store[adapter.communityId] = adapter;
    }
}
export function getUsernames() {
    return Object.values(store).map(adapter => adapter.fields.username);
}