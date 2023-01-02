const { loadFile } = require("./loadFile");
const { countChars } = require("./countChars");
//const { parse } = require("csv-parse");

const file = process.argv[2];
if (file.slice(-3) !== "csv") {
  console.error("ERROR: you must provide a csv file as an argument");
  process.exit(1);
}

const main = async () => {
  const fileText = loadFile(file);
  //   const count = await countChars(char, fileText);
  //   console.log(`We found ${count} ${char} in the file`);
};

main();
