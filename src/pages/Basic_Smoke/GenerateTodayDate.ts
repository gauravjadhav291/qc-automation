export function Today_date(): string {
  const today = new Date();
  return today.toLocaleDateString('en-GB').replace(/\//g, '-');
} 