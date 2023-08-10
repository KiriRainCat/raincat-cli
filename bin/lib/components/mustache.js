import mustache from "mustache";
import path from "path";
import fs from "fs-extra";

import { __dirname } from "./info.cjs";

const renderMITLicense = async (type, holders) => {
  const input = (
    await fs.readFile(path.join(__dirname, `../templates/generators/${type}-LICENSE`))
  ).toString();

  const output = mustache.render(input, { holders: holders });

  await fs.writeFile("./LICENSE", output);
};

export { renderMITLicense };
