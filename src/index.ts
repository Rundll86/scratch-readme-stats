import { compose, templates } from "./engine/composer";
import fs from "fs/promises";

fs.writeFile("output.svg", compose(templates.dark, {
    works: 200,
    likes: 100,
    looks: 100,
}));