"use strict";
// 1 - Faça um fetch das vendas: https://api.origamid.dev/json/vendas.json
// 2 - Defina o tipo/interface de cada venda (tuple)
// 3 - Some o total das vendas e mostre na tela
async function getSales() {
    const vendas = await (await fetch("https://api.origamid.dev/json/vendas.json")).json();
    return vendas;
}
async function sumSalesArray(allSales) {
    const totalSalesValue = allSales.reduce((total, sale) => (total += sale[1]), 0);
    return totalSalesValue;
}
async function fillFieldWithTotalValue(fieldSelector) {
    const field = document.querySelector(fieldSelector);
    if (!field)
        return;
    const allSales = await getSales();
    const totalValue = (await sumSalesArray(allSales)).toString();
    field.innerText = `R$ Total: ${totalValue}`;
}
fillFieldWithTotalValue("#totalSalesValue");
