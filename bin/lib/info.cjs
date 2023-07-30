const path = require("path");

exports.version = `v${require("../../package.json").version}`;

exports.__dirname = path.join(__dirname, "../");
