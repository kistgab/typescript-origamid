// Exercício 1
function normalizarTexto(texto: string) {
  return texto.trim().toLowerCase();
}

// Exercício 2
const input: HTMLInputElement | null = document.querySelector("input");

const total = localStorage.getItem("total");
if (input && total) {
  input.value = total;
  calcularGanho(Number(input.value));
}

function calcularGanho(value: number) {
  const p = document.querySelector("p");
  if (!p) return null;
  p.innerText = `ganho total: ${value + 100 - value * 0.2}`;
}

function totalMudou() {
  if (!input) return;

  const value = input.value;
  localStorage.setItem("total", value);
  calcularGanho(Number(value));
}

input?.addEventListener("keyup", totalMudou);
