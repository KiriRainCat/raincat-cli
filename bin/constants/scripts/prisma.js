import path from "path";
import fs from "fs-extra";

import { __dirname } from "../../lib/components/info.cjs";

const prisma_initGoSchema = async () => {
  // prisma 文件夹创建
  if (!fs.pathExistsSync("./prisma")) {
    fs.mkdirSync("./prisma");
  }

  // schema 文件写入
  if (!fs.existsSync("./prisma/schema.prisma")) {
    await fs.copyFile(
      path.join(__dirname, "templates/prisma/schema.go.prisma"),
      "./prisma/schema.prisma"
    );
  }

  // .env 写入
  if (fs.existsSync("./.env")) {
    if (!fs.readFileSync("./.env").toString().includes("DATABASE_URL")) {
      fs.appendFileSync(
        ".env",
        fs.readFileSync(path.join(__dirname, "templates/prisma/.env")).toString()
      );
    }
  } else {
    await fs.copyFile(path.join(__dirname, "templates/prisma/.env"), "./.env");
  }

  // .gitignore 写入
  if (fs.existsSync("./.gitignore")) {
    if (!fs.readFileSync("./.gitignore").toString().includes(".env")) {
      fs.appendFileSync(
        "./.gitignore",
        "\n# Keep environment variables out of version control\n.env"
      );
    }
  } else {
    fs.appendFileSync("./.gitignore", "# Keep environment variables out of version control\n.env");
  }
};

const prisma_initFlutterSchema = async () => {
  // prisma 文件夹创建
  if (!fs.pathExistsSync("./prisma")) {
    fs.mkdirSync("./prisma");
  }

  // schema 文件写入
  if (!fs.existsSync("./prisma/schema.prisma")) {
    await fs.copyFile(
      path.join(__dirname, "templates/prisma/schema.flutter.prisma"),
      "./prisma/schema.prisma"
    );
  }

  // .gitignore 写入
  if (fs.existsSync("./.gitignore")) {
    if (!fs.readFileSync("./.gitignore").toString().includes(".env")) {
      fs.appendFileSync("./.gitignore", "\nnode_modules");
    }
  } else {
    fs.appendFileSync("./.gitignore", "\nnode_modules");
  }
};

const prisma_initSchema = async () => {};

export { prisma_initSchema, prisma_initGoSchema, prisma_initFlutterSchema };
