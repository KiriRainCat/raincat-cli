import inquirer from "inquirer";
import chalk from "chalk";

import packages from "../constants/packages.js";
import templates from "../constants/templates.js";

const createProjectPrompt = [
  {
    type: "input",
    name: "projectName",
    default: chalk.gray("."),
    message: "项目名称: " + chalk.gray("(.为当前目录) >>"),
  },
  {
    type: "list",
    name: "template",
    message: "请选择想要创建的项目模板 " + chalk.gray(">>"),
    choices: [...templates],
  },
];

const addPackagePrompt = [
  {
    type: "list",
    name: "framework",
    message: "选择当前正在使用的[框架|语言] " + chalk.gray(">>"),
    choices: [
      new inquirer.Separator("———— Web 前端 ————"),
      { name: chalk.greenBright("Vue"), value: "vue" },
      { name: chalk.blueBright("React"), value: "react" },
      new inquirer.Separator("———— Web 后端 ————"),
      { name: chalk.cyanBright("Golang"), value: "go" },
    ],
  },
  {
    type: "checkbox",
    name: "packages",
    message: "选择想要安装的 package(s) " + chalk.gray(">>"),
    when: (answers) => answers.framework === "vue",
    choices: [
      new inquirer.Separator("———— 工具相关 ————"),
      ...packages.vue.utils,
      new inquirer.Separator("———— UI 相关 ————"),
      ...packages.vue.ui,
      ...packages.common.ui,
    ],
  },
  {
    type: "checkbox",
    name: "selectedPackages",
    message: "选择想要安装的 package(s) " + chalk.gray(">>"),
    when: (answers) => answers.framework === "react",
    choices: [new inquirer.Separator(chalk.gray("———— UI 相关 ————")), ...packages.common.ui],
  },
];

export { createProjectPrompt, addPackagePrompt };
