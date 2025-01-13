export function formatDate(date: Date, condition = 'mm:hh dd/mm/yyyy'): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (condition === 'dd/mm/yyyy') {
    return `${day}/${month}/${year}`;
  } else if (condition === 'mm:hh dd/mm/yyyy') {
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  } else {
    return 'Invalid condition';
  }
}
