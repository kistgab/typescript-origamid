function arrendondarValorParaCima(valor: string): string;
function arrendondarValorParaCima(valor: number): number;
function arrendondarValorParaCima(valor: number | string): number | string {
  if (typeof valor === "number") {
    return Math.ceil(valor);
  }
  return Math.ceil(Number(valor)).toString();
}

console.log(arrendondarValorParaCima("15"), "string");
console.log(arrendondarValorParaCima(15), "number");
