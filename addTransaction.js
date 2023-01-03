exports.addTransaction = (map, amount, id) => {
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
};
