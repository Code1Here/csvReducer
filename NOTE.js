const { parse } = require("csv-parse");
const fs = require("fs");
const map = new Map();

class Customer {
  constructor(CustomerID, Date, MinBalance = 0, MaxBalance = 0, EndingBalance = 0) {
    this.CustomerID = CustomerID;
    let MM_YYYY;
    if (Date !== undefined) MM_YYYY = Date.slice(0, 2) + Date.slice(5, Date.length);
    this.Date = MM_YYYY;
    this.MinBalance = MinBalance;
    this.MaxBalance = MaxBalance;
    this.EndingBalance = EndingBalance;
  }
}

fs.createReadStream("test.csv")
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
      map.has(id) ? addTransaction(transaction, id) : map.set(id, new Customer(id, data.Date, transaction, transaction, transaction));
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(map);
  });

function addTransaction(amount, id) {
  // We need to:: 1) set/check the date 2) @map[key] -> Take the obj's min, max & total using Amount col
  let currentTotal = map.get(id).EndingBalance;
  let singleTransaction = amount;

  let testArgg = currentTotal + singleTransaction;

  let min = map.get(id).MinBalance;
  min < testArgg ? min : (min = testArgg); // If subtracting (even through addition) the transaction is more ? keep min : keep argg
  map.get(id).MinBalance = min;

  let max = map.get(id).MaxBalance;
  max > testArgg ? max : (max = testArgg); // Vice versa
  map.get(id).MaxBalance = max;

  map.get(id).EndingBalance = testArgg; // Sum total
  // Date variable matters only initially; refactor string once
}
