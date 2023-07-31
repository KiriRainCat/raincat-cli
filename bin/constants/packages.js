import scripts from "./scripts/index.js";

const packages = {
  common: {
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
};

// TODO: 待完善
const pkgManagers = {};

export { packages, pkgManagers };
