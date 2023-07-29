import inquirer from "inquirer";
import ora from "ora";
import { exec } from "child_process";

import { extraPackagePrompt } from "./inquirer.js";
import { ifArrayEmpty } from "./utils.js";
import chalk from "chalk";

/**
 * 添加 package 到项目：预处理
 *
 * @param {Array<object>} packages
 */
const addPackages = async (packages) => {
  const pkgs = [];

  // 遍历 packages 数组
  for (const pkg of packages) {
    pkgs.push({ name: pkg.name, command: pkg.command });

    // 如果当前包有可添加附属
    if (!ifArrayEmpty(pkg.extras)) {
      for (const extra of pkg.extras) {
        // 询问是否安装附属
        if (await inquirer.prompt(extraPackagePrompt(pkg.name, extra.name))) {
          pkgs.push({ name: extra.name, command: extra.command });
        }
      }
    }
  }

  await installPackages(pkgs);
};

/**
 * 安装多个 packages 到项目
 *
 * @param {Array<object>} pkgs 包列表 { name, command }
 */
const installPackages = async (pkgs) => {
  const postInstallActions = [];

  const spinner = ora({ spinner: "line" });

  for (const pkg of pkgs) {
    // 如果当前包有安装后特殊操作
    if (!ifArrayEmpty(pkg.postInstallActions)) {
      for (const action of pkg.postInstallActions) {
        postInstallActions.push({ name: pkg.name, action });
      }
    }

    spinner.start(`installing package ${chalk.cyan(pkg.name)}`);
    exec(pkg.command, (err, stdout, stderr) => {
      spinner.stop();

      if (err) {
        console.log(chalk.red(`❌  ${chalk.cyan(pkg.name)} 安装失败！`));
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(chalk.green(`✔️  ${chalk.cyan(pkg.name)} 安装成功！`));
    });
  }

  await postInstall(postInstallActions);
};

// TODO: 待添加与完善
/**
 * 运行某些 package 需要 post install actions
 *
 * @param {Array<object>} postInstallActions { name, action }
 */
const postInstall = async (postInstallActions) => {
  const spinner = ora({ spinner: "line", suffixText: "executing postinstall actions..." });
  spinner.start();

  for (const action of postInstallActions) {
    console.log(`running postinstall script for ${action.name}P`);
  }

  spinner.stop();
};

// TODO: 待添加与完善 -- 自动适配包管理器
const getCurrentPackageManager = () => {};

export default addPackages;
