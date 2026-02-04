export interface UserProfile {
    works: number;
    likes: number;
    looks: number;
}
export interface UserProfileHandler {
    (user: string): Promise<Partial<UserProfile>>;
}
export interface UserNameHandler {
    (request: Request): Promise<string> | string;
}
export interface CommunityAdapter {
    getInfo: UserProfileHandler;
    getUser: UserNameHandler;
}