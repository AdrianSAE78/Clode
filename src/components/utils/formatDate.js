export const formatDate = (date) => {
  if (!date) return "Fecha no disponible";

  if (typeof date === "string" && date.includes("/")) {
    const [day, month, year] = date.split("/").map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = new Date(date);
  }

  if (isNaN(date)) return "Fecha inválida";

  const options = { day: '2-digit', month: 'long', year: 'numeric' };

  return date.toLocaleDateString('es-ES', options);
}