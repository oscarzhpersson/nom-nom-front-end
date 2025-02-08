function formatCurrency(amount, locale = 'sv-SE', currency = 'SEK') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export default formatCurrency;
