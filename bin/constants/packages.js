import scripts from "./scripts/index.js";

const packages = {
  common: {
    ui: [
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
    ui: [
      {
        name: "Element Plus",
        value: {
          name: "Element Plus",
          command: "pnpm add element-plus",
          postInstallActions: [],
        },
      },
    ],
  },
  react: {
    ui: [],
  },
};

// TODO: 待完善
const pkgManagers = {};

export { packages, pkgManagers };
