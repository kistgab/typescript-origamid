// 1 - Faça um fetch das vendas: https://api.origamid.dev/json/vendas.json
// 2 - Defina o tipo/interface de cada venda (tuple)
// 3 - Some o total das vendas e mostre na tela

interface IProduto {
  marca: string;
  cor: string;
}

type Sale = [string, number, string, IProduto];

async function getSales(): Promise<Sale[]> {
  const vendas: Sale[] = await (
    await fetch("https://api.origamid.dev/json/vendas.json")
  ).json();

  return vendas;
}

async function sumSalesArray(allSales: Sale[]): Promise<number> {
  const totalSalesValue = allSales.reduce(
    (total: number, sale: Sale) => (total += sale[1]),
    0
  );
  return totalSalesValue;
}

async function fillFieldWithTotalValue(fieldSelector: string) {
  const field = document.querySelector<HTMLElement>(fieldSelector);
  if (!field) return;
  const allSales: Sale[] = await getSales();
  const totalValue = (await sumSalesArray(allSales)).toString();
  field.innerText = `R$ Total: ${totalValue}`;
}

fillFieldWithTotalValue("#totalSalesValue");
