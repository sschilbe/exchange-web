
import React from 'react';
import { BsArrowRight } from 'react-icons/bs'
import { FaEquals } from 'react-icons/fa'

import './CurrencyConverter.css'

const CURRENCY_PRECISION = 6

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      amount: 0.00,
      currentCurrency: 'USD',
      newCurrency: 'USD',
      convertedAmount: (0).toFixed(CURRENCY_PRECISION),
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCurrentCurrencyChange = this.handleCurrentCurrencyChange.bind(this);
    this.handleNewCurrencyChange = this.handleNewCurrencyChange.bind(this);
  }

  componentDidMount() {
    // TODO: Error handling if API does not respond as expected
    fetch("/api/v1/exchange")
      .then(res => res.json())
      .then(response => {
        this.setState({
          currencies: response
        });
      });
  }

  handleAmountChange(event) {
    this.setState({
      amount: event.target.value
    }, () => this.calculateConversion())
  }

  handleCurrentCurrencyChange(event) {
    this.setState({
      currentCurrency: event.target.value
    }, () => this.calculateConversion())
  }

  handleNewCurrencyChange(event) {
    this.setState({
      newCurrency: event.target.value
    }, () => this.calculateConversion())
  }

  calculateConversion() {
    let currentCode = this.state.currentCurrency
    let newCode = this.state.newCurrency
    fetch(`/api/v1/exchange/compare?exchange1=${currentCode}&exchange2=${newCode}`)
      .then(res => res.json())
      .then(response => {
        let rate = Number(response.rate)
        this.setState({
          convertedAmount: (rate * this.state.amount).toFixed(CURRENCY_PRECISION)
        })
      })
  }

  render() {
    return (
      <div className="border">
        <form onSubmit={e => { e.preventDefault(); }}>
          <input type="number" placeholder='Enter $ Amount' onChange={this.handleAmountChange} data-testid="amount-input" />
          <select onChange={this.handleCurrentCurrencyChange} data-testid="current-currency-select">
            {this.state.currencies.map(currency => (
              <option key={currency.id} value={currency.code}>{currency.code}</option>
            ))}
          </select>
          {/* TODO: Make this icon a button that would allow the user to switch conversion direction */}
          <div className="icon">
            <BsArrowRight />
          </div>
          <select onChange={this.handleNewCurrencyChange} data-testid="new-currency-select">
            {this.state.currencies.map(currency => (
              <option key={currency.id} value={currency.code}>{currency.code}</option>
            ))}
          </select>
          <div className="icon">
            <FaEquals />
          </div>
          <input readOnly value={this.state.convertedAmount}></input>
        </form>
      </div>
    )
  }
}

export default CurrencyConverter