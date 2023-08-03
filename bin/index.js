#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";

import { createProjectPrompt, addPackagePrompt } from "./lib/components/inquirer.js";
import { downloadRepo } from "./lib/components/download.js";
import { pkginfo } from "./lib/info.cjs";
import { addPackages } from "./lib/addPackage.js";
import { commanderAction } from "./lib/utils.js";

// 监听 --help 指令
program.on("--help", () => {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(`Run ${chalk.cyan("raincat <command> -h")} for detailed usage of given command.`);
  console.log();
});

// Error 后显示帮助手册
program.showHelpAfterError();

// 当前版本
program.version(
  chalk.bold.cyan.italic.underline(`v${pkginfo.version}`),
  "-v, --version",
  "查看 cli 当前版本号"
);

/* ----------------------------------- 指令 ----------------------------------- */
// 创建项目指令
program
  .command("create")
  .description("选择模板创建项目")
  .option("-f, --force", "如果文件夹存在，进行覆盖")
  .action((cmd) => {
    commanderAction(async () => {
      const result = await inquirer.prompt(createProjectPrompt);
      downloadRepo(result.projectName, result.template, cmd.force);
    });
  });

// 安装 package(s) 指令
program
  .command("add")
  .description("显示 packages 列表并可以选择进行批量安装")
  .action(() => {
    commanderAction(async () => {
      const { packages, pkgManager } = await inquirer.prompt(addPackagePrompt);
      await addPackages(packages, pkgManager);
    });
  });

// 解析用户执行命令传入的参数
program.parse(process.argv);
