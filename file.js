var prices = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20
};
prices["ONE HUNDRED"] = 100;

function checkCashRegister(price, cash, cid) {
  let changeValue = cash - price;
  if(changeValue < 0) return {status: "INSUFFICIENT_FUNDS", change: []}
  let availableChange = 0;
  cid.forEach(element=>availableChange = availableChange + element[1])
  if(availableChange == changeValue) return {status: "CLOSED", change: cid}
  let i = cid.length;
  let change = [];
  while(i > 0 && changeValue > 0){
    changeValue = Math.round( changeValue * 100 + Number.EPSILON ) / 100
    i = i - 1
    let temp = cid[i];
    if(temp[1] != 0){
      if(temp[1] <= changeValue){
        changeValue = changeValue - temp[1];
        change.push(temp);
      }
      else{
        let tempCoinValue = prices[temp[0]];
        if(tempCoinValue <= changeValue){
          let totalCoinValue = Math.floor(changeValue / tempCoinValue) * tempCoinValue;
          changeValue = changeValue - totalCoinValue;
          change.push([temp[0], totalCoinValue]);
        }
      }
    }
  }
  if(changeValue > 0) return {status: "INSUFFICIENT_FUNDS", change: []}
  else return {status: "OPEN", change: change}
}
