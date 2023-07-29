const packages = {
  common: {
    ui: [
      {
        name: "Tailwind CSS",
        value: {
          name: "Tailwind CSS",
          command: "pnpm add -D tailwindcss postcss autoprefixer",
          extras: [
            {
              name: "类名自动整理插件(Prettier)",
              command: "pnpm add -D prettier-plugin-tailwindcss",
              postInstallActions: [],
            },
          ],
          postInstallActions: [],
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
