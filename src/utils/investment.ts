type InvestmentDataPoint = {
  year: number
  totalValue: number
  totalContributions: number
  appreciation: number
}

const calculateInvestmentSchedule = (
  initialAmount: number,
  rate: number,
  monthlyContribution: number,
  years: number,
  extraContribution: number = 0,
): InvestmentDataPoint[] => {
  const dataPoints: InvestmentDataPoint[] = []
  let balance = initialAmount
  let totalContributions = initialAmount

  dataPoints.push({
    year: 0,
    totalValue: initialAmount,
    totalContributions: initialAmount,
    appreciation: 0,
  })

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      const totalMonthly = monthlyContribution + extraContribution
      balance = (balance + totalMonthly) * (1 + rate / 12)
      totalContributions += totalMonthly
    }

    dataPoints.push({
      year,
      totalValue: Math.round(balance * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      appreciation: Math.round((balance - totalContributions) * 100) / 100,
    })
  }

  return dataPoints
}

export { calculateInvestmentSchedule }
export type { InvestmentDataPoint }
