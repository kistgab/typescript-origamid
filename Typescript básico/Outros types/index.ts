function toNumber(value: string | number) {
  if (typeof value === "number") return value;

  if (!isNaN(parseFloat(value))) return parseFloat(value);

  throw Error("value have to be a string containing a number or a number");
}

console.log(toNumber(90));
console.log(toNumber("80"));
console.log(toNumber("70aaa"));
console.log(toNumber("a60aaa"));
console.log(toNumber(" "));
console.log(toNumber("asdas"));
