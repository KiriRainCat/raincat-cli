import mustache from "mustache";
import path from "path";
import fs from "fs-extra";

import { __dirname } from "./info.cjs";

const renderLicense = async (type, holders) => {
  const input = (
    await fs.readFile(path.join(__dirname, `../templates/generators/${type}-LICENSE`))
  ).toString();

  const output = mustache.render(input, { year: new Date().getFullYear(), holders: holders });

  await fs.writeFile("./LICENSE", output);
};

export { renderLicense };
