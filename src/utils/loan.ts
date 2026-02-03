type LoanDataPoint = {
  year: number;
  balance: number;
  totalInterestPaid: number;
  yearlyInterest: number;
};

const calculateMonthlyInterest = (balance: number, rate: number): number => {
  return balance * (rate / 12);
};

type LoanScheduleResult = {
  dataPoints: LoanDataPoint[];
  payoffMonth: number | null;
};

const calculateLoanSchedule = (
  principal: number,
  rate: number,
  monthlyPayment: number,
  years: number,
  extraPayment: number = 0,
): LoanScheduleResult => {
  const dataPoints: LoanDataPoint[] = [];
  let balance = principal;
  let totalInterestPaid = 0;
  let payoffMonth: number | null = null;

  dataPoints.push({
    year: 0,
    balance: principal,
    totalInterestPaid: 0,
    yearlyInterest: 0,
  });

  for (let year = 1; year <= years; year++) {
    let yearlyInterest = 0;
    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break;

      const interest = calculateMonthlyInterest(balance, rate);
      totalInterestPaid += interest;
      yearlyInterest += interest;
      balance = balance + interest - monthlyPayment - extraPayment;

      if (balance <= 0 && payoffMonth === null) {
        payoffMonth = (year - 1) * 12 + month;
        balance = 0;
      }
    }

    dataPoints.push({
      year,
      balance: Math.round(balance * 100) / 100,
      totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
      yearlyInterest: Math.round(yearlyInterest * 100) / 100,
    });
  }

  return { dataPoints, payoffMonth };
};

export { calculateMonthlyInterest, calculateLoanSchedule };
export type { LoanDataPoint, LoanScheduleResult };
