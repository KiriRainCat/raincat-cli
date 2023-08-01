const flutter_showFlutterLeanWebsite = (pkgName) => {
  console.log(
    `\nℹ️  LeanFlutter: ${pkgName} 文档网址: https://github.com/leanflutter/${pkgName
      .toLowerCase()
      .split(" ")
      .join("_")}`
  );
};

export { flutter_showFlutterLeanWebsite };
