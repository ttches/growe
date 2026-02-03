import { useCashflowContext } from "../context/CashflowContext";

const DEFAULTS = {
  initialAmount: 1000,
  returnRate: 7,
  monthlyContribution: 300,
} as const;

export const useInvestment = () => {
  const { investmentValues, setInvestmentValues } = useCashflowContext();

  const onChange = (name: string, value: string) => {
    setInvestmentValues((prev) => ({ ...prev, [name]: value }));
  };

  const parsed = {
    initialAmount: investmentValues.initialAmount
      ? Number(investmentValues.initialAmount)
      : DEFAULTS.initialAmount,
    returnRate:
      (investmentValues.returnRate
        ? Number(investmentValues.returnRate)
        : DEFAULTS.returnRate) / 100,
    monthlyContribution: investmentValues.monthlyContribution
      ? Number(investmentValues.monthlyContribution)
      : DEFAULTS.monthlyContribution,
  };

  return {
    values: investmentValues,
    onChange,
    parsed,
  };
};
