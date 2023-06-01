"use strict";
async function fetchProduct() {
    const response = await fetch("https://api.origamid.dev/json/notebook.json");
    const data = await response.json();
    showProduct(data);
}
fetchProduct();
function showProduct(data) {
    console.log(data);
    document.body.innerHTML = `
    <div>
      <h2>${data.nome}</h2>
    </div>
  `;
}
