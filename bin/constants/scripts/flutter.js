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

const flutter_showGetXWebsite = () => {
  console.log(
    "\nℹ️  GetX 文档网址: https://github.com/jonataslaw/getx/blob/master/README.zh-cn.md"
  );
};

const flutter_showDioWebsite = () => {
  console.log("\nℹ️  Dio 文档网址: https://github.com/cfug/dio/blob/main/dio/README-ZH.md");
};

export {
  flutter_showFlutterLeanWebsite,
  flutter_showIsarDBWebsite,
  flutter_showGetXWebsite,
  flutter_showDioWebsite,
};
