#!/usr/bin/env node

import fs from "node:fs/promises";
import { program } from "commander";
import chalk from "chalk";

import { createProjectPrompt, addPackagePrompt } from "./lib/inquirer.js";

import { downloadRepo } from "./utils/download.js";

const pkginfo = JSON.parse(await fs.readFile("package.json"));

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
program.version(`v${pkginfo.version}`, "-v, --version", "查看 cli 当前版本号");

/* ----------------------------------- 指令 ----------------------------------- */
// 创建项目指令
program
  .command("create")
  .description("选择模板创建项目")
  .option("-f, --force", "如果文件夹存在，进行覆盖")
  .action(async (cmd) => {
    const result = await createProjectPrompt();
    downloadRepo(result.projectName, result.template, cmd.force);
  });

// 安装 package(s) 指令
program
  .command("add")
  .description("显示 packages 列表并可以选择进行批量安装")
  .action(async () => {
    const result = await addPackagePrompt();
    console.log(result.packages);
    if (pkginfo.dependencies.hasOwnProperty("prettier")) {
      console.log("检测到 Prettier，拓展安装以下包 [Tailwind Css] 的联动依赖");
    }
  });

// 解析用户执行命令传入的参数
program.parse(process.argv);
