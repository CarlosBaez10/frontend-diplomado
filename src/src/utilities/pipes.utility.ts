export const getTypedCharacter = (
  currentText: string,
  newText: string
): string => {
  const lastCharacter = newText.at(-1) ?? "";
  if (currentText.length === 0) return lastCharacter;
  return newText.length > 1 && currentText === lastCharacter
    ? newText[0]
    : lastCharacter;
};

export const formatDateToText = (date: string): string => {
  const aux = new Date(date);
  aux.setHours(aux.getHours() - 5);
  const dayName = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(
    aux
  );
  const day = aux.getDate();
  const monthName = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
    aux
  );
  return `${capitalizeWord(dayName)}, ${day} de ${capitalizeWord(
    monthName
  )} del ${aux.getFullYear()} a las ${aux.getUTCHours()}:${aux.getMinutes()} `;
};

const capitalizeWord = (word: string) => {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const formatDate = (date1: string): string => {
  const date = new Date(date1);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses comienzan desde 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
