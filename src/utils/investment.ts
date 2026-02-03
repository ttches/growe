type InvestmentDataPoint = {
  year: number
  totalValue: number
  totalContributions: number
  appreciation: number
  yearlyReturns: number
}

const calculateInvestmentSchedule = (
  initialAmount: number,
  rate: number,
  monthlyContribution: number,
  years: number,
  extraContribution: number = 0,
  additionalPaymentOverflow: number = 0,
  additionalPaymentOverflowStart: number | null = null,
): InvestmentDataPoint[] => {
  const dataPoints: InvestmentDataPoint[] = []
  let balance = initialAmount
  let totalContributions = initialAmount

  dataPoints.push({
    year: 0,
    totalValue: initialAmount,
    totalContributions: initialAmount,
    appreciation: 0,
    yearlyReturns: 0,
  })

  for (let year = 1; year <= years; year++) {
    const startingBalance = balance
    let yearlyContributions = 0
    for (let month = 1; month <= 12; month++) {
      const currentMonth = (year - 1) * 12 + month
      const overflow =
        additionalPaymentOverflowStart !== null &&
        currentMonth >= additionalPaymentOverflowStart
          ? additionalPaymentOverflow
          : 0
      const totalMonthly = monthlyContribution + extraContribution + overflow
      balance = (balance + totalMonthly) * (1 + rate / 12)
      totalContributions += totalMonthly
      yearlyContributions += totalMonthly
    }
    const yearlyReturns = balance - startingBalance - yearlyContributions

    dataPoints.push({
      year,
      totalValue: Math.round(balance * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      appreciation: Math.round((balance - totalContributions) * 100) / 100,
      yearlyReturns: Math.round(yearlyReturns * 100) / 100,
    })
  }

  return dataPoints
}

export { calculateInvestmentSchedule }
export type { InvestmentDataPoint }
