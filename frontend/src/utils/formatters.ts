export function formatKES(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount).replace('KES', 'KSh');
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-KE').format(val);
}
