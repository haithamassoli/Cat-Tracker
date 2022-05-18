export function getFormattedDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return dd + "-" + mm + "-" + yyyy;
}

export function dateIsValidForm(dateStr: string) {
  const regex = /\d{2}-\d{2}-\d{4}/;
  if (regex.test(dateStr)) {
    return true;
  }
  return false;
}

export function getDateMinusDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
