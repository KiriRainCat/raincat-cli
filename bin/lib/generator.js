import chalk from "chalk";

import { renderMITLicense } from "./components/mustache.js";

const generateLicense = async (type, holders) => {
  await renderMITLicense(type, holders);
  console.log(chalk.green("\n" + `✔️  ${chalk.cyan(type)} LICENSE 生成成功！`));
};

export { generateLicense };
