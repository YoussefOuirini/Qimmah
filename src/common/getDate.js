export function getLessonDate(timeStamp) {
  if (timeStamp) {
    const lessonDate = new Date(timeStamp);
    return lessonDate.toLocaleDateString("nl-NL");
  }
  const lessonDate = new Date();
  return lessonDate.toLocaleDateString("nl-NL");
}

export function getTimeStamp(dateString) {
  const parsedDate = Date.parse(dateString);
  return parsedDate;
}