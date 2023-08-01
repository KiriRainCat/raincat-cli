import inquirer from "inquirer";
import chalk from "chalk";

import { packages, pkgManagers } from "../constants/packages.js";
import templates from "../constants/templates.js";
import { parseChoices } from "./utils.js";

import SearchBox from "inquirer-search-checkbox";
import { getCurrentPackageManager } from "./addPackage.js";
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

const ans = [];
const addPackagePrompt = [
  {
    type: "list",
    name: "framework",
    message: "选择当前正在使用的[框架|语言] " + chalk.gray(">>"),
    choices: [
      new inquirer.Separator("———— 前端 ————"),
      { name: chalk.greenBright("Vue"), value: { name: "vue", isFrontend: true } },
      { name: chalk.blueBright("React"), value: { name: "react", isFrontend: true } },
      new inquirer.Separator("———— 后端 ————"),
      { name: chalk.cyanBright("Golang"), value: "go" },
      new inquirer.Separator("———— 全栈 ————"),
      { name: chalk.cyanBright("Flutter"), value: "flutter" },
    ],
  },
  {
    type: "list",
    name: "pkgManager",
    message: "请选择想要创建的项目模板 " + chalk.gray(">>"),
    when: async (answers) => {
      ans[1] = await getCurrentPackageManager();
      answers.pkgManager = ans[1][0];
      return ans[1].length !== 1 && answers.framework.isFrontend;
    },
    choices: [...pkgManagers],
  },
  {
    type: "search-checkbox",
    name: "packages",
    message: "选择想要安装的 package(s) " + chalk.gray(">>"),
    when: (answers) => {
      ans[0] = answers.framework;
      return ans[0] !== undefined && ans[1] !== undefined;
    },
    choices: () => [
      ...parseChoices(
        packages[ans[0].name || ans[0]],
        ans[0].isFrontend ? packages.common.frontend : packages.common.backend
      ),
    ],
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
