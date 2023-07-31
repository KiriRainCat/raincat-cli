import scripts from "./scripts/index.js";

const packages = {
  common: {
    frontend: {
      Style: [
        {
          name: "Tailwind CSS",
          value: {
            name: "Tailwind CSS",
            command: "pnpm add -D tailwindcss postcss autoprefixer",
            postInstallActions: [scripts.tailwindcss_createConfig],
            extras: [
              {
                name: "类名自动整理插件(Prettier)",
                command: "pnpm add -D prettier-plugin-tailwindcss prettier",
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
          command: "pnpm add -D element-plus",
          postInstallActions: [],
        },
      },
      {
        name: "Arco Design",
        value: {
          name: "Arco Design",
          command: "pnpm add -D @arco-design/web-vue",
          postInstallActions: [],
        },
      },
      {
        name: "Naive UI",
        value: {
          name: "Naive UI",
          command: "pnpm add -D naive-ui",
          postInstallActions: [],
        },
      },
      {
        name: "Vant 4 (m)",
        value: {
          name: "Vant 4 (m)",
          command: "pnpm add -D vant",
          postInstallActions: [],
        },
      },
      {
        name: "Varlet (m)",
        value: {
          name: "Varlet (m)",
          command: "pnpm add -D @varlet/ui",
          postInstallActions: [],
        },
      },
    ],
    Utils: [
      {
        name: "VueUse",
        value: {
          name: "VueUse",
          command: "pnpm add @vueuse/core",
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

// TODO: 待完善
const pkgManagers = {};

export { packages, pkgManagers };
