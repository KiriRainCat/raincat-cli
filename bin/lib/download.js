import chalk from "chalk";
import download from "download-git-repo";
import fs from "fs";
import ora from "ora";
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
  const __dirname = process.cwd();
  let dest = __dirname + "\\" + name;
  // 如果路径存在
  if (fs.existsSync(dest) && name !== ".") {
    if (!force) {
      console.log(
        `${chalk.red("ERR!")} ${name} 目录已存在，如需覆盖，请使用 ${chalk.cyan(
          "raincat create - f"
        )}`
      );
      return;
    }
    fs.rmSync(dest, { force: true, recursive: true });
  }

  // 如果与当前路径同名 或 项目名 = "."
  if (__dirname.endsWith(name) || name === ".") {
    dest = __dirname;
    name = path.basename(__dirname);
  }

  // 仓库下载模板
  const spinner = ora({ spinner: "line", suffixText: "downloading..." });
  spinner.start();
  download(template.repo, dest, (err) => {
    // 报错展示下载失败
    if (err) {
      console.log(chalk.bold.red("\n ❌  下载失败！"));
      return;
    }

    spinner.stop();
    console.log(chalk.bold.green("\n ✔️  下载成功！"));

    // 如果是后端项目，不展示 pnpm install 等提示
    if (!template.isFrontend) {
      console.log(`\r\nSuccessfully created project ${chalk.cyan(name)}`);
      return;
    }

    // 前端项目，展示 pnpm install 等提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(name)}`);
    console.log(`\r\n  cd ${chalk.cyan(name)}`);
    console.log("  pnpm install");
    console.log("  pnpm run dev\r\n");
  });
};

export { downloadRepo };
