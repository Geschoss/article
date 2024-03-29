'use strict';

class AccountCommand {
    constructor(operation, account, amount) {
        this.operation = operation;
        this.account = account;
        this.amount = amount;
    }
}

class BankAccount {
    constructor(name) {
        this.name = name;
        this.balance = 0;
        BankAccount.collection.set(name, this);
    }
}

BankAccount.collection = new Map();

const operations = {
    Withdraw: (command) => {
        const account = BankAccount.collection.get(command.account);
        account.balance -= command.amount;
    },
    Income: (command) => {
        const account = BankAccount.collection.get(command.account);
        account.balance += command.amount;
    },
    Allowed: (command) => {
        if (command.operation === 'Income') return true;
        const account = BankAccount.collection.get(command.account);
        return account.balance >= command.amount;
    },
};

class Bank {
    constructor() {
        this.commands = [];
    }

    operation(account, amount) {
        const operation = amount < 0 ? 'Withdraw' : 'Income';
        const execute = operations[operation];
        const command = new AccountCommand(
            operation, account.name, Math.abs(amount)
        );
        const allowed = operations.Allowed(command);
        if (!allowed) {
            const target = BankAccount.collection.get(command.account);
            throw new Error(
                'Command is not allowed:\n' + JSON.stringify(command) +
                '\non ' + JSON.stringify(target)
            );
        }
        this.commands.push(command);
        execute(command);
    }

    showOperations() {
        console.table(this.commands);
    }
}

// Usage

const bank = new Bank();
const account1 = new BankAccount('Marcus Aurelius');
bank.operation(account1, 1000);
bank.operation(account1, -50);
const account2 = new BankAccount('Antoninus Pius');
bank.operation(account2, 500);
bank.operation(account2, -100);
bank.operation(account2, 150);
bank.showOperations();
console.table([account1, account2]);