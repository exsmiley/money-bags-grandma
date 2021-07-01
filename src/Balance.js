import React from 'react';
import BalanceHistoryTable from './BalanceHistoryTable';

class Balance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            checkingBalance: 0,
            savingsBalance: 0,
            history: [],
            historyKeys: ['account', 'source', 'time', 'change', 'balance', 'description'],
            withdrawalAmount: '',
            depositAmount: '',
            withdrawalAccount: 'checking',
            depositAccount: 'checking',
            withdrawalDescription: '',
            depositDescription: '',

            // transfer values
            fromAccount: 'checking',
            toAccount: 'savings',
            transferAmount: '',
            transferDescription: ''
        };
    
        // form state updaters
        this.handleWithdrawalAmountChange = this.handleWithdrawalAmountChange.bind(this);
        this.handleDepositAmountChange = this.handleDepositAmountChange.bind(this);
        this.handleWithdrawalAccountChange = this.handleWithdrawalAccountChange.bind(this);
        this.handleDepositAccountChange = this.handleDepositAccountChange.bind(this);
        this.handleWithdrawalDescriptionChange = this.handleWithdrawalDescriptionChange.bind(this);
        this.handleDepositDescriptionChange = this.handleDepositDescriptionChange.bind(this);
        this.switchTransferAccounts = this.switchTransferAccounts.bind(this);
        this.handleTransferAmountChange = this.handleTransferAmountChange.bind(this);
        this.handleTransferDescriptionChange = this.handleTransferDescriptionChange.bind(this);

        // actual balance updaters
        this.withdraw = this.withdraw.bind(this);
        this.deposit = this.deposit.bind(this);
        this.transfer = this.transfer.bind(this);
    }

    handleWithdrawalAccountChange(event) {
        this.setState({withdrawalAccount: event.target.value});
    }

    handleDepositAccountChange(event) {
        console.log(event.target.value);
        this.setState({depositAccount: event.target.value});
    }

    handleWithdrawalAmountChange(event) {
        this.setState({withdrawalAmount: event.target.value});
    }

    handleDepositAmountChange(event) {
        this.setState({depositAmount: event.target.value});
    }

    handleWithdrawalDescriptionChange(event) {
        this.setState({withdrawalDescription: event.target.value});
    }

    handleDepositDescriptionChange(event) {
        this.setState({depositDescription: event.target.value});
    }
  
    withdraw(event) {
        const withdrawalAmount = parseInt(event.target.withdrawalAmount.value);
        const balanceAmount = this.state[this.state.withdrawalAccount + 'Balance'];
        if(isNaN(withdrawalAmount) || withdrawalAmount < 0) {
            alert('You must enter a positive number value to withdraw!');
        }
        else if(withdrawalAmount > balanceAmount) {
            alert("You cannot withdraw money! " + this.state.withdrawalAccount + " balance " + balanceAmount + " is less than withdrawal amount " + withdrawalAmount + "!");
        } else {
            const newBalance = balanceAmount - withdrawalAmount;
            let newStateVal = {};
            newStateVal[this.state.withdrawalAccount + 'Balance'] = newBalance;
            this.setState(newStateVal);
            this.state.history.push({
                account: this.state.withdrawalAccount,
                time: new Date().toLocaleString(),
                change: -1 * withdrawalAmount,
                balance: newBalance,
                source: 'withdrawal',
                description: this.state.withdrawalDescription
            });
        }

        event.preventDefault();
    }
  
    deposit(event) {
        const balanceAmount = this.state[this.state.depositAccount + 'Balance'];
        const depositAmount = parseInt(event.target.depositAmount.value);
        const newBalance = balanceAmount + depositAmount;

        if(isNaN(depositAmount) || depositAmount < 0) {
            alert('You must enter a positive number value to deposit!');
        } else {
            let newStateVal = {};
            newStateVal[this.state.depositAccount + 'Balance'] = newBalance;
            this.setState(newStateVal);
            this.state.history.push({
                account: this.state.depositAccount,
                time: new Date().toLocaleString(),
                change: '+' + depositAmount,
                balance: newBalance,
                source: 'deposit',
                description: this.state.depositDescription
            });
        }

        event.preventDefault();
    }

    // transfer funcs
    switchTransferAccounts(event) {
        const oldFrom = this.state.fromAccount;
        const oldTo = this.state.toAccount;
        this.setState({fromAccount: oldTo, toAccount: oldFrom});
        event.preventDefault();
    }

    handleTransferAmountChange(event) {
        this.setState({transferAmount: event.target.value});
    }

    handleTransferDescriptionChange(event) {
        this.setState({transferDescription: event.target.value});
    }

    transfer(event) {
        const toBalanceAmount = this.state[this.state.toAccount + 'Balance'];
        const fromBalanceAmount = this.state[this.state.fromAccount + 'Balance'];
        const transferAmount = parseInt(event.target.transferAmount.value);

        if(isNaN(transferAmount) || transferAmount < 0) {
            alert('You must enter a positive number value to deposit!');
        } else if(transferAmount > fromBalanceAmount) {
            alert("You cannot transfer money! " + this.state.fromAccount + " balance " + fromBalanceAmount + " is less than the transfer amount " + transferAmount + "!");
        } else {
            const newToBalance = toBalanceAmount + transferAmount;
            const newFromBalance = fromBalanceAmount - transferAmount;

            let newStateVal = {};
            newStateVal[this.state.toAccount + 'Balance'] = newToBalance;
            newStateVal[this.state.fromAccount + 'Balance'] = newFromBalance;
            this.setState(newStateVal);
            this.state.history.push({
                account: this.state.toAccount,
                time: new Date().toLocaleString(),
                change: '+' + transferAmount,
                balance: newToBalance,
                source: 'transfer from ' + this.state.fromAccount,
                description: this.state.transferDescription
            });
            this.state.history.push({
                account: this.state.fromAccount,
                time: new Date().toLocaleString(),
                change: -1 * transferAmount,
                balance: newFromBalance,
                source: 'transfer to ' + this.state.toAccount,
                description: this.state.transferDescription
            });
        }

        event.preventDefault();
    }
  
    render() {
      return (
        <div>
            <h1>Current Checking Balance: {this.state.checkingBalance}</h1>
            <h1>Current Savings Balance: {this.state.savingsBalance}</h1>
            <form onSubmit={this.withdraw}>
                <select name="withdrawalAccount" value={this.state.withdrawalAccount} onChange={this.handleWithdrawalAccountChange}>
                    <option value="checking">checking</option>
                    <option value="savings">savings</option>
                </select>
                <label>
                    Amount:
                    <input name="withdrawalAmount" type="text" value={this.state.withdrawalAmount} onChange={this.handleWithdrawalAmountChange}/>
                </label>
                <label>
                    Description:
                    <textarea name="withdrawalDescription" value={this.state.withdrawalDescription} onChange={this.handleWithdrawalDescriptionChange} />
                </label>
                <input type="submit" value="Withdraw" />
            </form>
            <form onSubmit={this.deposit}>
                <select name="depositAccount" value={this.state.depositAccount} onChange={this.handleDepositAccountChange}>
                    <option value="checking">checking</option>
                    <option value="savings">savings</option>
                </select>
                <label>
                    Amount:
                    <input name="depositAmount" type="text" value={this.state.depositAmount} onChange={this.handleDepositAmountChange}/>
                </label>
                <label>
                    Description:
                    <textarea name="depositDescription" value={this.state.depositDescription} onChange={this.handleDepositDescriptionChange} />
                </label>
                <input type="submit" value="Deposit" />
            </form>
            <form onSubmit={this.transfer}>
                <label>
                    From: {this.state.fromAccount}
                </label>
                <button name='transferAccountSwitch' onClick={this.switchTransferAccounts}>&#8826; &minus; &#8827;</button>
                <label>
                    To: {this.state.toAccount}&nbsp;
                </label>
                <label>
                    Amount:
                    <input name="transferAmount" type="text" value={this.state.transferAmount} onChange={this.handleTransferAmountChange}/>
                </label>
                <label>
                    Description:
                    <textarea name="transferDescription" value={this.state.transferDescription} onChange={this.handleTransferDescriptionChange} />
                </label>
                <input type="submit" value="Transfer" />
            </form>
            <BalanceHistoryTable history={this.state.history} keys={this.state.historyKeys}/>
        </div>
      );
    }
  }

export default Balance;
