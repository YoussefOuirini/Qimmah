export function getLessonDate() {
  const lessonDate = new Date();
  return lessonDate.toLocaleDateString("nl-NL");
}