export function getLessonDate(timeStamp) {
  const options = { day:'2-digit', month:'2-digit', year: 'numeric'};
  if (timeStamp) {
    const lessonDate = new Date(timeStamp);
    return lessonDate.toLocaleDateString("nl-NL", options);
  }
  const lessonDate = new Date();
  return lessonDate.toLocaleDateString("nl-NL", options);
}

export function getTimeStamp(dateString) {
  const parsedDate = Date.parse(dateString);
  return parsedDate;
}

export function sortDates(aRow, bRow, key) {
  const a = aRow[key];
  const b = bRow[key];

  if (!a || !b) {
    return -1;
  }
  const dateA = a.split('-').join('');
  const dateB = b.split('-').join('');
  return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
}