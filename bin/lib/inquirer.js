import inquirer from "inquirer";
import chalk from "chalk";

import { packages } from "../constants/packages.js";
import templates from "../constants/templates.js";
import { parseChoices } from "./utils.js";

import SearchBox from "inquirer-search-checkbox";
inquirer.registerPrompt("search-checkbox", SearchBox);

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
      new inquirer.Separator("———— 前端 ————"),
      { name: chalk.greenBright("Vue"), value: "vue" },
      { name: chalk.blueBright("React"), value: "react" },
      new inquirer.Separator("———— 后端 ————"),
      { name: chalk.cyanBright("Golang"), value: "go" },
    ],
  },
  {
    type: "search-checkbox",
    name: "packages",
    message: "选择想要安装的 package(s) " + chalk.gray(">>"),
    when: (answers) => answers.framework === "vue",
    choices: [...parseChoices(packages.vue, packages.common)],
  },
  {
    type: "search-checkbox",
    name: "selectedPackages",
    message: "选择想要安装的 package(s) " + chalk.gray(">>"),
    when: (answers) => answers.framework === "react",
    choices: [...parseChoices(packages.react, packages.common)],
  },
];

const extraPackagePrompt = (parentName, pkgName) => {
  return {
    type: "confirm",
    name: "confirm",
    message: `是否安装附属 ${chalk.cyan(parentName)}: [${chalk.magenta(pkgName)}] ${chalk.gray(
      ">>"
    )}`,
  };
};

export { createProjectPrompt, addPackagePrompt, extraPackagePrompt };
