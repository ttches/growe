import { useMemo } from "react";
import { useLoan } from "./useLoan";
import { useInvestment } from "./useInvestment";
import { useAdditionalFunds } from "./useAdditionalFunds";
import { useTimeHorizon } from "./useTimeHorizon";
import { calculateLoanSchedule } from "../utils/loan";
import { calculateInvestmentSchedule } from "../utils/investment";

export const useChartData = () => {
  const { parsed: loan } = useLoan();
  const { parsed: investment } = useInvestment();
  const { extraToLoan, extraToInvest } = useAdditionalFunds();
  const { years } = useTimeHorizon();

  return useMemo(() => {
    const loanData = calculateLoanSchedule(
      loan.amount,
      loan.rate,
      loan.payment,
      years,
      extraToLoan
    );

    const investmentData = calculateInvestmentSchedule(
      investment.initialAmount,
      investment.returnRate,
      investment.monthlyContribution,
      years,
      extraToInvest
    );

    const loanBalanceData = [
      {
        id: "Loan Balance",
        data: loanData.map((d) => ({ x: d.year, y: d.balance })),
      },
      {
        id: "Interest Paid",
        data: loanData.map((d) => ({ x: d.year, y: d.totalInterestPaid })),
      },
    ];

    const investmentGrowthData = [
      {
        id: "Investment Value",
        data: investmentData.map((d) => ({ x: d.year, y: d.totalValue })),
      },
      {
        id: "Contributions",
        data: investmentData.map((d) => ({
          x: d.year,
          y: d.totalContributions,
        })),
      },
    ];

    const netWorthValues = loanData.map(
      (d, i) => investmentData[i].totalValue - d.balance
    );

    const netWorthData = [
      {
        id: "Net Worth",
        data: loanData.map((d, i) => ({
          x: d.year,
          y: netWorthValues[i],
        })),
      },
    ];

    const netWorthYMin = Math.min(0, netWorthValues[0]);

    return { loanBalanceData, investmentGrowthData, netWorthData, netWorthYMin };
  }, [
    loan.amount,
    loan.rate,
    loan.payment,
    investment.initialAmount,
    investment.returnRate,
    investment.monthlyContribution,
    years,
    extraToLoan,
    extraToInvest,
  ]);
};
