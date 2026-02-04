import { registerAdapter } from "../../dataHandler";
import { fortyCode, zeroCat, smallBox, ccw } from "../adapters/community";

export function init() {
    registerAdapter(fortyCode, zeroCat, smallBox, ccw);
}