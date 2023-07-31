import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { exec } from "child_process";

import { extraPackagePrompt } from "./inquirer.js";
import { ifArrayEmpty } from "./utils.js";

//* ----------------------------------- 包处理 ---------------------------------- *//

/**
 * 添加 package 到项目：预处理
 *
 * @param {Array<object>} packages
 */
const addPackages = async (packages) => {
  if (ifArrayEmpty(packages)) {
    return;
  }

  const pkgs = [];
  // 遍历 packages 数组
  for (const pkg of packages) {
    pkgs.push(pkg);

    // 如果当前包有可添加附属
    if (!ifArrayEmpty(pkg.extras)) {
      for (const extra of pkg.extras) {
        // 询问是否安装附属
        if ((await inquirer.prompt(extraPackagePrompt(pkg.name, extra.name))).confirm) {
          pkgs.push(extra);
        }
      }
    }
  }

  installPackages(pkgs);
};

//* ----------------------------------- 包安装 ---------------------------------- *//

const postInstallActions = [];

const installPackage = (pkg) => {
  return new Promise((resolve, reject) => {
    const spinner = ora({ spinner: "line" });
    spinner.start(`installing package ${chalk.cyan(pkg.name)}`);

    // 如果当前包有安装后特殊操作
    if (!ifArrayEmpty(pkg.postInstallActions)) {
      for (const func of pkg.postInstallActions) {
        postInstallActions.push({ name: pkg.name, func });
      }
    }

    exec(pkg.command, (err, stdout, stderr) => {
      if (err) {
        spinner.stop();
        console.log(chalk.red(`❌  ${chalk.cyan(pkg.name)} 安装失败！`));
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        reject(err);
      } else {
        spinner.stop();
        console.log(chalk.green(`✔️  ${chalk.cyan(pkg.name)} 安装成功！`));
        if (pkg.command.includes("npm") || pkg.command.includes("yarn"))
          exec("pnpm i", () => resolve());
        resolve();
      }
    });
  });
};

/**
 * 安装多个 packages 到项目
 *
 * @param {Array<object>} pkgs 包列表 { name, command, postInstallActions?, extras? }
 */
const installPackages = async (pkgs) => {
  console.log();

  const promises = pkgs.map(installPackage);

  for (const promise of promises) {
    await promise;
  }
  postInstall(postInstallActions);
};

//* ---------------------------- 包安装后需要运行的 actions --------------------------- *//
const executeAction = (action) => {
  return new Promise(async (resolve) => {
    await action.func();
    resolve();
  });
};

/**
 * 运行某些 package 需要的 post install actions
 *
 * @param {Array<object>} postInstallActions { name, action }
 */
const postInstall = async (postInstallActions) => {
  if (ifArrayEmpty(postInstallActions)) {
    return;
  }

  const promises = postInstallActions.map(executeAction);

  console.log();
  const spinner = ora({ spinner: "line", suffixText: "executing postinstall actions..." });
  spinner.start();

  await Promise.all(promises);

  spinner.stop();
  console.log(chalk.bold.green("✔️  执行 postinstall actions 成功！"));
  //? 不知道怎么解决进程不终止的文件，先直接强制 exit 吧，反正方法都执行完了
  process.exit();
};

// TODO: 待添加与完善 -- 自动适配包管理器
const getCurrentPackageManager = () => {};

export default addPackages;
