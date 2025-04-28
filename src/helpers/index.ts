export function formatTime(minutesTotal: number): string {
  const hours = Math.floor(minutesTotal / 60);
  const minutes = minutesTotal % 60;

  if (hours > 0 && minutes > 0) return `${hours} ч ${minutes} мин`;
  if (hours > 0) return `${hours} ч`;
  return `${minutes} мин`;
}

export function formatIngredients(ingredients: string): string[] {
  const match = ingredients.match(/^Ингредиенты:\s*(.+?)\./i);
  if (!match) return [];

  return match[1]
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);
}