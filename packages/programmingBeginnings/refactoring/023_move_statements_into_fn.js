/* Перенос инструкции в функцию
  Move Statements into Funcion
*/
// before
result.push(`<p>titile: ${person.photo.title}</p>`);
retult.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    `<p>location: ${aPhoto.location}</p>`,
    `<p>data: ${aPhoto.data.toDateString()}</p>`,
  ];
}
// after
retult.push(photoData(person.photo));

function photoData(aPhoto) {
  return [
    `<p>titile: ${person.photo.title}</p>`
    `<p>location: ${aPhoto.location}</p>`,
    `<p>data: ${aPhoto.data.toDateString()}</p>`,
  ];
}

/* Мотивация

  Удаление дублирования является одним из лучших
  практических правил для получения хорошего кода.

*/
