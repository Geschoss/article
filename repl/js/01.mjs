const books = [1, 2, 3, 4, 5];
for (let i = 0; i <= books.length; i ++) {
  let book = books[i];
  print(`index = ${i} ${book.name}`)
}












function print(...args) {
  console.log(...args);
}