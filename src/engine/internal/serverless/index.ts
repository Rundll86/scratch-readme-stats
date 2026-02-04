import { registerAdapter } from "../../dataHandler";
import { fortyCode, zeroCat, smallBox } from "../adapters/community";

export function init() {
    registerAdapter(fortyCode, zeroCat, smallBox);
}