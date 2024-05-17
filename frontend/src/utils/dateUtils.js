export function formatIsoDateToShortDate(isoDateString) {
  const date = new Date(isoDateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
