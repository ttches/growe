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
  const { extraToLoan, extraToInvest, redirectAfterPayoff } =
    useAdditionalFunds();
  const { years } = useTimeHorizon();

  return useMemo(() => {
    const loanResult = calculateLoanSchedule(
      loan.amount,
      loan.rate,
      loan.payment,
      years,
      extraToLoan,
    );
    const loanData = loanResult.dataPoints;
    const payoffMonth = loanResult.payoffMonth;

    const investmentData = calculateInvestmentSchedule(
      investment.initialAmount,
      investment.returnRate,
      investment.monthlyContribution,
      years,
      extraToInvest,
      redirectAfterPayoff ? extraToLoan : 0,
      redirectAfterPayoff ? payoffMonth : null,
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
      {
        id: "Yearly Interest",
        data: loanData.map((d) => ({ x: d.year, y: d.yearlyInterest })),
      },
    ].reverse();

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
      {
        id: "Yearly Returns",
        data: investmentData.map((d) => ({ x: d.year, y: d.yearlyReturns })),
      },
    ].reverse();

    const netWorthValues = loanData.map(
      (d, i) => investmentData[i].totalValue - d.balance,
    );

    const netWorthData = [
      {
        id: "Net Worth",
        data: loanData.map((d, i) => ({
          x: d.year,
          y: netWorthValues[i],
        })),
      },
      {
        id: "Yearly Returns",
        data: investmentData.map((d) => ({ x: d.year, y: d.yearlyReturns })),
      },
      {
        id: "Yearly Interest",
        data: loanData.map((d) => ({ x: d.year, y: d.yearlyInterest })),
      },
    ].reverse();

    const netWorthYMin = Math.min(0, netWorthValues[0]);

    return {
      loanBalanceData,
      investmentGrowthData,
      netWorthData,
      netWorthYMin,
    };
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
    redirectAfterPayoff,
  ]);
};
