import darkTemplate from "../templates/dark.svg";
import lightTemplate from "../templates/light.svg";
import { CardInfo, CardStyle, UserProfile } from "./dataHandler";

export function compose(template: string, data: UserProfile & CardInfo & CardStyle) {
    let result = template;
    for (const [key, value] of Object.entries(data)) {
        result = result.replaceAll(`\${${key}}`, value.toString());
    }
    return result;
}
export const templates = {
    dark: darkTemplate,
    light: lightTemplate,
};