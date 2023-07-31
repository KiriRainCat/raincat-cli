import fs from "fs-extra";
import path from "path";
import prettier from "prettier";

import { ifArrayEmpty } from "../../lib/utils.js";
import { __dirname } from "../../lib/info.cjs";

const tailwindcss_createConfig = async () => {
  await fs.copyFile(
    path.join(__dirname, "templates/tailwind/postcss.config.js"),
    "./postcss.config.js"
  );

  await fs.copyFile(
    path.join(__dirname, "templates/tailwind/tailwind.config.js"),
    "./tailwind.config.js"
  );
};

const tailwindcss_extra_setConfig = async () => {
  const targetFile = path.join(process.cwd(), ".prettierrc.json");
  let json = { plugins: ["prettier-plugin-tailwindcss"] };

  // 如果 Prettier 配置文件存在
  if (fs.existsSync(targetFile)) {
    json = fs.readJsonSync(targetFile);

    // 如果包含 plugins 属性
    if (!ifArrayEmpty(json.plugins) && !json.plugins.includes("prettier-plugin-tailwindcss")) {
      json.plugins.push("prettier-plugin-tailwindcss");
    }
  }

  // 用 Prettier 格式化一次 json 字符串后再写入
  json = await prettier.format(JSON.stringify(json), { parser: "json" });
  fs.writeFileSync(targetFile, json);
};

export { tailwindcss_createConfig, tailwindcss_extra_setConfig };
