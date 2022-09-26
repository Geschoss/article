const createStatementData = require('./createStatementData.js');

function textStatement(invoice, plays) {
    return renderingPlainText(createStatementData(invoice, plays));
}
function renderingPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.preformances) {
        result += ` ${perf.play.name}: ${usd(perf.amount / 100)}`;
        result += ` (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(data.totalAmount /100)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;

    return result;
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += '<table>\n';
    result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>\n';
    for (let perf of data.preformances) {
        result += ` <tr><td>${perf.play.name}</td>`;
        result += `<td>${perf.audience}</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }
    result += '</table>\n';
    result += `<p>Amount owed is `;
    result += `<em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>You earned <em>${data.totalVolumeCredits}`;
    result += `</em> credits</p>`;
    return result;
}
// inner functions
function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(aNumber);
}

module.exports = { textStatement, htmlStatement };