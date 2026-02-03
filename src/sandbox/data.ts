import { calculateLoanSchedule } from '../utils/loan'
import { calculateInvestmentSchedule } from '../utils/investment'

const loanResult = calculateLoanSchedule(50000, 0.065, 600, 15)
const loanData = loanResult.dataPoints
const investmentData = calculateInvestmentSchedule(5000, 0.08, 500, 15)

const loanChartData = {
  id: 'Loan Balance',
  data: loanData.map((d) => ({ x: d.year, y: d.balance })),
}

const loanInterestData = {
  id: 'Total Interest Paid',
  data: loanData.map((d) => ({ x: d.year, y: d.totalInterestPaid })),
}

const investmentValueData = {
  id: 'Investment Value',
  data: investmentData.map((d) => ({ x: d.year, y: d.totalValue })),
}

const investmentContributionsData = {
  id: 'Contributions',
  data: investmentData.map((d) => ({ x: d.year, y: d.totalContributions })),
}

const investmentAppreciationData = {
  id: 'Appreciation',
  data: investmentData.map((d) => ({ x: d.year, y: d.appreciation })),
}

const netWorthData = {
  id: 'Net Worth',
  data: loanData.map((d, i) => ({
    x: d.year,
    y: investmentData[i].totalValue - d.balance,
  })),
}

export {
  loanData,
  investmentData,
  loanChartData,
  loanInterestData,
  investmentValueData,
  investmentContributionsData,
  investmentAppreciationData,
  netWorthData,
}
