import { useCashflowContext } from "../context/CashflowContext";

const DEFAULTS = {
  amount: 300,
  splitPercent: 50,
} as const;

export const useAdditionalFunds = () => {
  const {
    additionalAmount,
    setAdditionalAmount,
    additionalEnabled,
    setAdditionalEnabled,
    splitPercent,
    setSplitPercent,
    redirectAfterPayoff,
    setRedirectAfterPayoff,
  } = useCashflowContext();

  const rawAmount = additionalAmount
    ? Number(additionalAmount)
    : DEFAULTS.amount;
  const parsedAmount = additionalEnabled ? rawAmount : 0;

  const extraToLoan = parsedAmount * (1 - splitPercent / 100);
  const extraToInvest = parsedAmount * (splitPercent / 100);

  return {
    amount: additionalAmount,
    setAmount: setAdditionalAmount,
    enabled: additionalEnabled,
    setEnabled: setAdditionalEnabled,
    splitPercent,
    setSplitPercent,
    extraToLoan,
    extraToInvest,
    placeholder: String(DEFAULTS.amount),
    redirectAfterPayoff,
    setRedirectAfterPayoff,
  };
};
