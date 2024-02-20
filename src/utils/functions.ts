/**
 * Сортирует массив объектов по ключу даты по убыванию.
 * @param {Array<Object>} array - Массив объектов для сортировки.
 * @returns {Array<Object>} - Отсортированный массив объектов.
 */
function sortByDateAscending(array: any) {
  return array.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Форматирует дату в строке в локализованный русский формат.
 *
 * @param {string} inputDate - Строка с датой в формате 'год-месяц-день'.
 * @returns {string} - Локализованная строка с датой в формате 'день месяц год' на русском языке.
 *                      Возвращает 'Неверная дата', если входная строка не является корректной датой.
 */
function formatDate(inputDate: string) {
  const dateObject = new Date(inputDate);

  if (isNaN(dateObject.getTime())) {
    return 'Неверная дата';
  }

  const options = {day: 'numeric', month: 'numeric', year: 'numeric'};
  const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(
    dateObject,
  );

  return formattedDate;
}

export {sortByDateAscending, formatDate};
