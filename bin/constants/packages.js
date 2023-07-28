export default {
  common: {
    ui: [
      {
        name: "Tailwind CSS",
        value: { name: "Tailwind CSS", command: "pnpm add -D tailwindcss", files: [] },
      },
    ],
  },
  vue: {
    utils: [
      {
        name: "常用自动 api 引入",
        value: {
          name: "常用自动 api 引入",
          command: "pnpm add -D unplugin-auto-import unplugin-vue-components",
          files: [],
        },
      },
      {
        name: "Icon 自动引入(Iconify)",
        value: { name: "Icon 自动引入(Iconify)", command: "pnpm add -D unplugin-icon", files: [] },
      },
    ],
    ui: [
      {
        name: "Element Plus",
        value: {
          name: "Element Plus",
          command: "pnpm add element-plus",
          extra: [
            {
              name: "组件与 API 自动引入",
              dependencies: ["常用自动 api 引入"],
              files: [],
            },
          ],
        },
      },
    ],
  },
  react: {
    ui: [],
  },
};
