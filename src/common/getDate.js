//Use this method - it does handle double digits correctly
Date.prototype.ddmmyyyy = function() {
  var dd = this.getDate().toString();
  var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
  return [dd.length===2 ? '' : '0', dd, mm.length===2 ? '' : '0', mm, this.getFullYear()].join(''); // padding
};

export function getLessonDate() {
  const lessonDate = new Date();
  return lessonDate.ddmmyyyy();
}