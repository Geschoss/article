/* Замена условной инструкции полиморфизмом
  Replace Conditional with Polymorpism
*/
// before
switch (bitd.type) {
  case 'EuropeanSwallow':
    return "average";
  case 'AfricanSwallo':
    return (bird.numberOfCoconuts > 2) ? "tired" : "average";
  case 'NorwegianBlueParrot':
    return (bird.volatage > 100) ? "scorched" : "beautiful";
  default:
    return "unknown";
}
// after
class EuropeanSwallow {
  get plumage() {
    return "average";
  }
}
class AfricanSwallow {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? "tired" : "average";
  }
}
class NorwegianBluePerrot {
  get plumage() {
    return (this.voltage > 100) ? "scorched" : "beautifil";
  }
}
/* Мотивация

  Сложная условная логика - одна из самых трудных вещей
  в программировании, поэтому я всегда ищу способы добавить
  к ней структуры.
*/