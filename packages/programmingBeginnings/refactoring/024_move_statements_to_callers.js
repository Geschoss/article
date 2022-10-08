/* Перенос инструкций в точку вызова
  Move Statements to Callers
*/
// before
emitPhotoData_b(outStream, person.photo);
function emitPhotoData_b(outStream, photo) {
  outStream.write(`<p>title: ${photo.title}</p>\n`);
  outStream.write(`<p>location: ${photo.location}</p>\n`);
}
// after
emitPhotoData(outStream, person.photo);
outStream.write(`<p>title: ${person.photo.title}</p>\n`);

function emitPhotoData_b(outStream, photo) {
  outStream.write(`<p>location: ${photo.location}</p>\n`);
}
/* Мотивация

  Функции является основными стоиртельными блоками абстракций, которые
  мы сторим как программисты. И, как и в случае любой абстракции,
  мы не всегда правильно определяем ее границы.
*/