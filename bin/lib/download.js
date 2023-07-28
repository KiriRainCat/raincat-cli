import chalk from "chalk";
import download from "download-git-repo";
import fs from "fs";
import path from "path";
import process from "process";

/**
 * 下载任意 repository 到指的目录
 *
 * @param {string} name 项目名称
 * @param {object} template 模板
 * @param {boolean} force 强制？
 */
const downloadRepo = (name, template, force) => {
  const dest = process.cwd() + "\\" + name;
  // 如果路径存在
  if (fs.existsSync(dest)) {
    if (!force) {
      console.log(
        `${chalk.red("ERR!")} ${name} 目录已存在，如需覆盖，请使用 ${chalk.cyan(
          "raincat create - f"
        )}`
      );
      return;
    }
    fs.rmdirSync(dest);
  }

  // 如果与当前路径同名
  if (process.cwd().endsWith(name)) {
    dest = process.cwd();
  }

  // 仓库下载模板
  download(template.repo, dest, (err) => {
    // 报错展示下载失败
    if (err) {
      console.log("下载失败...");
      return;
    }

    // 如果是后端项目，不展示 npm install 等提示
    if (!template.isFrontend) {
      console.log(`\r\nSuccessfully created project ${chalk.cyan(name)}`);
      return;
    }

    // 前端项目，展示 npm install 等提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(name)}`);
    console.log(`\r\n  cd ${chalk.cyan(name)}`);
    console.log("  pnpm install\r\n");
    console.log("  pnpm run dev\r\n");
  });
};

export { downloadRepo };
