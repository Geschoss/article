/* Замена встроенного кода вызовом функции
  Replace Inline Code with Funtion Call
*/
// before
let appliesToMass = false;
for (const s of states) {
  if (s === 'MA') {
    appliesToMass = true;
  }
}
// after
appliesToMass = states.includes('MA');

/* Мотивация

  Функции позволяют упаковать фрагменты поведения.
*/