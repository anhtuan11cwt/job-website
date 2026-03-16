export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  }).format(amount);
};

export const formatSalary = (amountInMillions) => {
  return `${amountInMillions} Triệu`;
};
