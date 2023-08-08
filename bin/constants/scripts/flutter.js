const flutter_showFlutterLeanWebsite = (pkgName) => {
  console.log(
    `\nℹ️  LeanFlutter: ${pkgName} 文档网址: https://github.com/leanflutter/${pkgName
      .toLowerCase()
      .split(" ")
      .join("_")}`
  );
};

const flutter_showIsarDBWebsite = () => {
  console.log("\nℹ️  Isar 数据库 文档网址: https://isar.dev");
};

const flutter_showPrismaOrmWebsite = () => {
  console.log("\nℹ️  Prisma ORM 文档网址: https://prisma.pub/");
};

export { flutter_showFlutterLeanWebsite, flutter_showIsarDBWebsite };
