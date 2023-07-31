import path from "path";
import fs from "fs-extra";

import { __dirname } from "../../lib/info.cjs";

const prisma_initGoSchema = async () => {
  // prisma 文件夹创建
  if (!fs.pathExistsSync("./prisma")) {
    fs.mkdirSync("./prisma");
  }

  // schema 文件写入
  await fs.copyFile(
    path.join(__dirname, "templates/prisma/schema.go.prisma"),
    "./prisma/schema.prisma"
  );

  // .env 写入
  fs.appendFileSync(
    ".env",
    fs.readFileSync(path.join(__dirname, "templates/prisma/.env")).toString()
  );

  // .gitignore 写入
  let gitignoreString = "# Keep environment variables out of version control\n.env";
  if (
    fs.existsSync("./.gitignore") &&
    !fs.readFileSync("./.gitignore").toString().includes(".env")
  ) {
    gitignoreString = "\n" + gitignoreString;
  }
  fs.appendFileSync("./.gitignore", gitignoreString);
};

const prisma_initSchema = async () => {};

export { prisma_initSchema, prisma_initGoSchema };
