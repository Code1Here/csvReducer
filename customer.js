module.exports = class Customer {
  constructor(CustomerID, Date, MinBalance = 0, MaxBalance = 0, EndingBalance = 0) {
    this.CustomerID = CustomerID;
    let MM_YYYY;
    if (Date !== undefined) MM_YYYY = Date.slice(0, 2) + Date.slice(5, Date.length);
    this.Date = MM_YYYY;
    this.MinBalance = MinBalance;
    this.MaxBalance = MaxBalance;
    this.EndingBalance = EndingBalance;
  }
};
