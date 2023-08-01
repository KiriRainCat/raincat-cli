import scripts from "./scripts/index.js";

const packages = {
  common: {
    frontend: {
      Style: [
        {
          name: "Tailwind CSS",
          value: {
            name: "Tailwind CSS",
            command: "-D tailwindcss postcss autoprefixer",
            postInstallActions: [scripts.tailwindcss_createConfig],
            extras: [
              {
                name: "类名自动整理插件(Prettier)",
                command: "-D prettier-plugin-tailwindcss prettier",
                postInstallActions: [scripts.tailwindcss_extra_setConfig],
              },
            ],
          },
        },
      ],
    },
    backend: {},
  },
  vue: {
    UI: [
      {
        name: "Element Plus",
        value: {
          name: "Element Plus",
          command: "-D element-plus",
          postInstallActions: [],
        },
      },
      {
        name: "Arco Design",
        value: {
          name: "Arco Design",
          command: "-D @arco-design/web-vue",
          postInstallActions: [],
        },
      },
      {
        name: "Naive UI",
        value: {
          name: "Naive UI",
          command: "-D naive-ui",
          postInstallActions: [],
        },
      },
      {
        name: "Vant 4 (m)",
        value: {
          name: "Vant 4 (m)",
          command: "-D vant",
          postInstallActions: [],
        },
      },
      {
        name: "Varlet (m)",
        value: {
          name: "Varlet (m)",
          command: "-D @varlet/ui",
          postInstallActions: [],
        },
      },
    ],
    Utils: [
      {
        name: "VueUse",
        value: {
          name: "VueUse",
          command: "@vueuse/core",
        },
      },
    ],
  },
  react: {
    UI: [],
  },
  go: {
    Utils: [
      {
        name: "Viper",
        value: {
          name: "Viper",
          command: "go get -u github.com/spf13/viper",
        },
      },
    ],
    DB: [
      {
        name: "Prisma",
        value: {
          name: "Prisma",
          command: "go get -u github.com/steebchen/prisma-client-go",
          postInstallActions: [scripts.prisma_initGoSchema],
        },
      },
      {
        name: "Gorm",
        value: {
          name: "Gorm",
          command: "go get -u gorm.io/gorm",
        },
      },
    ],
  },
  flutter: {
    Utils: [
      {
        name: "GetX",
        value: {
          name: "GetX",
          command: "flutter pub add get",
        },
      },
      {
        name: "Process Run",
        value: {
          name: "Process Run",
          command: "flutter pub add process_run",
        },
      },
    ],
  },
};

const pkgManagers = [
  {
    name: "pnpm",
    value: {
      name: "pnpm",
      lockFile: "pnpm-lock.yaml",
      add: "pnpm add",
    },
  },
  {
    name: "npm",
    value: {
      name: "npm",
      lockFile: "package-lock.json",
      add: "npm install",
    },
  },
  {
    name: "yarn",
    value: {
      name: "yarn",
      lockFile: "yarn.lock",
      add: "yarn add",
    },
  },
];

export { packages, pkgManagers };
