export function getLessonDate(date) {
  if (date) {
    const lessonDate = new Date(date);
    return lessonDate.toLocaleDateString("nl-NL");
  }
  const lessonDate = new Date();
  return lessonDate.toLocaleDateString("nl-NL");
}

export function getTimeStamp(dateString) {
  const parsedDate = Date.parse(dateString);
  return parsedDate;
}