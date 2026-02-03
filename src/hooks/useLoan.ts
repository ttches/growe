import { useCashflowContext } from "../context/CashflowContext";

const DEFAULTS = {
  amount: 50000,
  rate: 6.5,
  payment: 500,
} as const;

export const useLoan = () => {
  const { loanValues, setLoanValues, useMinPayment, setUseMinPayment } =
    useCashflowContext();

  const onChange = (name: string, value: string) => {
    setLoanValues((prev) => ({ ...prev, [name]: value }));
  };

  const amount = loanValues.loanAmount
    ? Number(loanValues.loanAmount)
    : DEFAULTS.amount;
  const rate =
    (loanValues.loanInterest
      ? Number(loanValues.loanInterest)
      : DEFAULTS.rate) / 100;
  const minPayment = amount * (rate / 12);
  const userPayment = loanValues.loanPayment
    ? Number(loanValues.loanPayment)
    : DEFAULTS.payment;

  const parsed = {
    amount,
    rate,
    payment: useMinPayment ? minPayment : userPayment,
  };

  return {
    values: loanValues,
    onChange,
    parsed,
    minPayment,
    useMinPayment,
    setUseMinPayment,
  };
};
