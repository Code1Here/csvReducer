const { parse } = require("csv-parse");
const fs = require("fs");
const map = new Map();

class Customer {
  constructor(CustomerID, Date, MinBalance = 0, MaxBalance = 0, EndingBalance = 0) {
    this.CustomerID = CustomerID;
    const MM_YYYY = Date.slice(0, 2) + Date.slice(6, Date.length);
    this.Date = MM_YYYY;
    this.MinBalance = MinBalance;
    this.MaxBalance = MaxBalance;
    this.EndingBalance = EndingBalance;
  }
}
fs.createReadStream("original.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    map[data["Customer Id"]] ? addTransaction(map, data["Customer Id"], data) : (map[data["Customer Id"]] = new Customer(data["Customer Id"], data.Date, data.Amount, data.Amount, data.Amount));
    
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(map);
  });

function addTransaction(thisMap, CustomerID, data) {
  // We need to:: 1) set/check the date 2) @map[key] -> Take the obj's min, max & total using Amount col
  let currentTotal = thisMap[CustomerID].get('EndingBalance');
  let singleTransaction = data.get('Amount');

  let testArgg = currentTotal + singleTransaction;

  let min = thisMap[CustomerID].get('MinBalance');
  min < testArgg ? min : (min = testArgg); // If subtracting (even through addition) the transaction is more ? keep min : keep argg
  thisMap.set(thisMap[CustomerID].get('MinBalance'), min);

  let max = thisMap[CustomerID].get('MaxBalance');
  max > testArgg ? max : (max = testArgg); // Vice versa
  thisMap.set(thisMap[CustomerID].get('MaxBalance'), max);

  thisMap[CustomerID].get('EndingBalance') += currentTotal; // This matters at the end

  // Date variable matters only initially; refactor string once
}
