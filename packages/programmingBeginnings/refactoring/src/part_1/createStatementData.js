class PerfomanceCalculator {
  constructor(aPerfomance, aPlay) {
    this.perfomance = aPerfomance;
    this.play = aPlay;
  }
  get amount() {
    throw new Error('Subclass responsibility');
  }
  get volumeCredits() {
    return Math.max(this.perfomance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerfomanceCalculator {
  get amount() {
    let result = 400000;
    if (this.perfomance.audience > 30) { 
      result += 1000 * (this.perfomance.audience - 30);
    }
    return result;
  }
}
class ComedyCalculator extends PerfomanceCalculator {
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.perfomance.audience / 5);
  }
}

function createPerfomanceCalculator(aPerfomance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerfomance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerfomance, aPlay);
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
}

function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.preformances = invoice.preformances.map(enrichPerfomance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;

  function enrichPerfomance(aPerfomance) {
    const calculator = createPerfomanceCalculator(
      aPerfomance,
      playFor(aPerfomance)
    );
    const result = Object.assign({}, aPerfomance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

    return result;
  }

  function playFor(aPerfomance) {
    return plays[aPerfomance.playID];
  }

  function totalVolumeCredits(data) {
    let result = 0;
    for (let perf of data.preformances) {
      result += perf.volumeCredits;
    }
    return result;
  }

  function totalAmount(data) {
    let result = 0;
    for (let perf of data.preformances) {
      result += perf.amount;
    }
    return result;
  }
}

module.exports = createStatementData;
