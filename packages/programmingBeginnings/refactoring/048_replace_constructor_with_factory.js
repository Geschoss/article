/* Замена конструктора фабричной функций
  Replace Constructor with Factory Function
*/
// before
leadEngineer = new Employee(document.leedEngineer, 'E');
// after
leadEngineer = createEngineer(document.leadEnfineer);

/* Мотивация

  Меньше приседваний.
  Можно использовать как функции и HOF
*/