"use strict";
// Exercício 1
function normalizarTexto(texto) {
    return texto.trim().toLowerCase();
}
// Exercício 2
const input = document.querySelector("input");
const total = localStorage.getItem("total");
if (input && total) {
    input.value = total;
    calcularGanho(Number(input.value));
}
function calcularGanho(value) {
    const p = document.querySelector("p");
    if (!p)
        return null;
    p.innerText = `ganho total: ${value + 100 - value * 0.2}`;
}
function totalMudou() {
    if (!input)
        return;
    const value = input.value;
    localStorage.setItem("total", value);
    calcularGanho(Number(value));
}
input?.addEventListener("keyup", totalMudou);
