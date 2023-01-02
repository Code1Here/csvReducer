const fs = require("fs");

exports.loadFile = (path) => {
  return fs.readFileSync(path, "utf8");
};
