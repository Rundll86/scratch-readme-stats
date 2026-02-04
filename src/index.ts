import { registerAdapter } from "./engine/dataHandler";
import { fortyCode, smallBox, zeroCat } from "./internal/adapters";

registerAdapter(fortyCode, zeroCat, smallBox);
