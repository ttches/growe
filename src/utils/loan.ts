type LoanDataPoint = {
  year: number;
  balance: number;
  totalInterestPaid: number;
};

const calculateMonthlyInterest = (balance: number, rate: number): number => {
  return balance * (rate / 12);
};

const calculateLoanSchedule = (
  principal: number,
  rate: number,
  monthlyPayment: number,
  years: number,
): LoanDataPoint[] => {
  const dataPoints: LoanDataPoint[] = [];
  let balance = principal;
  let totalInterestPaid = 0;

  dataPoints.push({
    year: 0,
    balance: principal,
    totalInterestPaid: 0,
  });

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break;

      const interest = calculateMonthlyInterest(balance, rate);
      totalInterestPaid += interest;
      balance = balance + interest - monthlyPayment;

      if (balance < 0) {
        balance = 0;
      }
    }

    dataPoints.push({
      year,
      balance: Math.round(balance * 100) / 100,
      totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    });
  }

  return dataPoints;
};

export { calculateMonthlyInterest, calculateLoanSchedule };
export type { LoanDataPoint };
