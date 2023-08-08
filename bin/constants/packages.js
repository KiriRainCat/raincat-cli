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
        name: "Vant 4 (mobile)",
        value: {
          name: "Vant 4 (mobile)",
          command: "-D vant",
          postInstallActions: [],
        },
      },
      {
        name: "Varlet (mobile)",
        value: {
          name: "Varlet (mobile)",
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
    LeanFlutter: [
      {
        name: "Window Manager",
        value: {
          name: "Window Manager",
          command: "flutter pub add window_manager",
          postInstallActions: [() => scripts.flutter_showFlutterLeanWebsite("Window Manager")],
        },
      },
      {
        name: "Hotkey Manager",
        value: {
          name: "Hotkey Manager",
          command: "flutter pub add hotkey_manager",
          postInstallActions: [() => scripts.flutter_showFlutterLeanWebsite("Hotkey Manager")],
        },
      },
      {
        name: "Launch At Startup",
        value: {
          name: "Launch At Startup",
          command: "flutter pub add launch_at_startup",
          postInstallActions: [() => scripts.flutter_showFlutterLeanWebsite("Launch At Startup")],
        },
      },
      {
        name: "Tray Manager",
        value: {
          name: "Tray Manager",
          command: "flutter pub add tray_manager",
          postInstallActions: [() => scripts.flutter_showFlutterLeanWebsite("Tray Manager")],
        },
      },
      {
        name: "Screen Retriever",
        value: {
          name: "Screen Retriever",
          command: "flutter pub add screen_retriever",
          postInstallActions: [() => scripts.flutter_showFlutterLeanWebsite("Screen Retriever")],
        },
      },
      {
        name: "Auto Updater",
        value: {
          name: "Auto Updater",
          command: "flutter pub add auto_updater",
          postInstallActions: [() => scripts.flutter_showFlutterLeanWebsite("Auto Updater")],
        },
      },
      {
        name: "Local Notifier",
        value: {
          name: "Local Notifier",
          command: "flutter pub add local_notifier",
          postInstallActions: [() => scripts.flutter_showFlutterLeanWebsite("Local Notifier")],
        },
      },
    ],
    Utils: [
      // {
      //   name: "msix (win 打包)",
      //   value: {
      //     name: "msix (win 打包)",
      //     command: "flutter pub add --dev msix",
      //   },
      // },
      {
        name: "Process Run",
        value: {
          name: "Process Run",
          command: "flutter pub add process_run",
        },
      },
      {
        name: "GetX",
        value: {
          name: "GetX",
          command: "flutter pub add get",
        },
        postInstallActions: [scripts.flutter_showGetXWebsite],
      },
      {
        name: "Win32 (ffi)",
        value: {
          name: "Win32 (ffi)",
          command: "flutter pub add ffi win32",
        },
      },
      {
        name: "Dio (http)",
        value: {
          name: "Dio (http)",
          command: "flutter pub get dio",
        },
        extras: [
          {
            name: "Dio Cookie Manager",
            command: "flutter pub get dio_cookie_manager",
          },
        ],
        postInstallActions: [scripts.flutter_showDioWebsite],
      },
    ],
    DB: [
      {
        name: "Prisma",
        value: {
          name: "Prisma",
          command:
            "flutter pub add orm json_annotation && flutter pub add -d build_runner json_serializable && pnpm add prisma",
        },
        postInstallActions: [scripts.prisma_initFlutterSchema],
      },
      {
        name: "Isar",
        value: {
          name: "Isar",
          command:
            "flutter pub add isar isar_flutter_libs && flutter pub add -d isar_generator build_runner",
        },
        postInstallActions: [scripts.flutter_showIsarDBWebsite],
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
