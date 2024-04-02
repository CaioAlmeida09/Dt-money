export const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  const day = d.getUTCDate().toString().padStart(2, "0");
  const month = (d.getUTCMonth() + 1).toString().padStart(2, "0"); // Mês é baseado em zero
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export const priceFrometed = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
