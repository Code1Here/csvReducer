const { parse } = require("csv-parse");
const fs = require("fs");
const map = new Map();
const Customer = require("./customer.js");
const { addTransaction } = require("./addTransaction.js");
const file = process.argv[2];

if (file.slice(-3) !== "csv") {
  console.error("ERROR: you must provide a csv file as an argument");
  process.exit(1);
}

fs.createReadStream(file)
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    const id = data["Customer Id"];
    const transaction = parseInt(data.Amount);
    if (id !== "") {
      map.has(id) ? addTransaction(map, transaction, id) : map.set(id, new Customer(id, data.Date, transaction, transaction, transaction));
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(map);
  });
