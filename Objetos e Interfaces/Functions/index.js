"use strict";
function arrendondarValorParaCima(valor) {
    if (typeof valor === "number") {
        return Math.ceil(valor);
    }
    return Math.ceil(Number(valor)).toString();
}
console.log(arrendondarValorParaCima("15"), "string");
console.log(arrendondarValorParaCima(15), "number");
