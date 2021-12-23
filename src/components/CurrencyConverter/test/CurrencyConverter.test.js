import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrencyConverter from './../CurrencyConverter';

describe("<CurrencyConverter />", () => {
  test('renders amount input', () => {
    render(<CurrencyConverter />);

    const inputEl = screen.getByTestId("amount-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "number");
  });

  test('renders current currency select', () => {
    render(<CurrencyConverter />);

    const selectEl = screen.getByTestId("current-currency-select");
    expect(selectEl).toBeInTheDocument();
  });

  test('renders new currency select', () => {
    render(<CurrencyConverter />);

    const selectEl = screen.getByTestId("new-currency-select");
    expect(selectEl).toBeInTheDocument();
  });
})
