export const localeDate = (date: Date) => {
  return Intl.DateTimeFormat('de', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}
