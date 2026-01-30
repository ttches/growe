import { useState, useMemo } from "react";
import InputSection from "../components/InputSection";
import UltraMinimalChart from "../components/UltraMinimalChart";
import { calculateLoanSchedule } from "../utils/loan";
import { calculateInvestmentSchedule } from "../utils/investment";

const loanFields = [
  { label: "Loan Amount", name: "loanAmount", placeholder: "50000" },
  {
    label: "Interest Rate",
    name: "loanInterest",
    placeholder: "6.5",
    suffix: "%",
  },
  { label: "Monthly Payment", name: "loanPayment", placeholder: "500" },
];

const investmentFields = [
  { label: "Initial Investment", name: "initialAmount", placeholder: "1000" },
  { label: "Return Rate", name: "returnRate", placeholder: "7", suffix: "%" },
  {
    label: "Monthly Contribution",
    name: "monthlyContribution",
    placeholder: "300",
  },
];

const Home = () => {
  const [loanValues, setLoanValues] = useState<Record<string, string>>({});
  const [investmentValues, setInvestmentValues] = useState<
    Record<string, string>
  >({});
  const [additionalValues, setAdditionalValues] = useState<Record<string, string>>({});
  const [splitPercent, setSplitPercent] = useState(50);
  const [timeHorizon, setTimeHorizon] = useState(10);

  const handleLoanChange = (name: string, value: string) => {
    setLoanValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInvestmentChange = (name: string, value: string) => {
    setInvestmentValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdditionalChange = (name: string, value: string) => {
    setAdditionalValues((prev) => ({ ...prev, [name]: value }));
  };

  const loanAmount = Number(loanValues.loanAmount) || 50000;
  const loanInterest = (Number(loanValues.loanInterest) || 6.5) / 100;
  const loanPayment = Number(loanValues.loanPayment) || 500;

  const initialAmount = Number(investmentValues.initialAmount) || 1000;
  const returnRate = (Number(investmentValues.returnRate) || 7) / 100;
  const monthlyContribution =
    Number(investmentValues.monthlyContribution) || 300;

  const additionalAmount = Number(additionalValues.amount) || 0;
  const extraToLoan = additionalAmount * (1 - splitPercent / 100);
  const extraToInvest = additionalAmount * (splitPercent / 100);

  const chartData = useMemo(() => {
    const loanData = calculateLoanSchedule(
      loanAmount,
      loanInterest,
      loanPayment,
      timeHorizon,
      extraToLoan,
    );
    const investmentData = calculateInvestmentSchedule(
      initialAmount,
      returnRate,
      monthlyContribution,
      timeHorizon,
      extraToInvest,
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

    const netWorthData = [
      {
        id: "Net Worth",
        data: loanData.map((d, i) => ({
          x: d.year,
          y: investmentData[i].totalValue - d.balance,
        })),
      },
    ];

    return { loanBalanceData, investmentGrowthData, netWorthData };
  }, [
    loanAmount,
    loanInterest,
    loanPayment,
    initialAmount,
    returnRate,
    monthlyContribution,
    timeHorizon,
    extraToLoan,
    extraToInvest,
  ]);

  return (
    <div className="h-screen bg-[#171421] overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-4 py-8">
        <div className="h-full grid grid-cols-[1fr_3fr] gap-8">
          <div className="space-y-6 overflow-y-auto">
            <InputSection
              fields={loanFields}
              values={loanValues}
              onChange={handleLoanChange}
              rightContent={extraToLoan > 0 ? { loanPayment: `+ $${Math.round(extraToLoan)}` } : undefined}
            />
            <InputSection
              fields={investmentFields}
              values={investmentValues}
              onChange={handleInvestmentChange}
              rightContent={extraToInvest > 0 ? { monthlyContribution: `+ $${Math.round(extraToInvest)}` } : undefined}
            />
            <div className="bg-[#1E1A2E] rounded-xl border border-[#3D3554] p-6 space-y-4">
              <div>
                <label htmlFor="additionalPayments" className="block text-sm font-medium text-[#A9A1C1] mb-1">
                  Additional Payments
                </label>
                <input
                  type="text"
                  id="additionalPayments"
                  value={additionalValues.amount || ''}
                  onChange={(e) => handleAdditionalChange('amount', e.target.value)}
                  placeholder="300"
                  className="w-full px-3 py-2 bg-[#171421] border border-[#3D3554] rounded-lg text-[#E5C07B] placeholder-[#6B6483] focus:ring-2 focus:ring-[#C792EA] focus:border-[#C792EA] outline-none transition-colors"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={splitPercent}
                onChange={(e) => setSplitPercent(Number(e.target.value))}
                className="w-full accent-[#E5C07B]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A9A1C1] mb-2">
                Time Horizon: {timeHorizon} years
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(Number(e.target.value))}
                className="w-full accent-[#E5C07B]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 h-full">
            <div className="flex-1 min-h-0">
              <UltraMinimalChart
                title="Loan Balance"
                data={chartData.loanBalanceData}
              />
            </div>
            <div className="flex-1 min-h-0">
              <UltraMinimalChart
                title="Investment Growth"
                data={chartData.investmentGrowthData}
              />
            </div>
            <div className="flex-1 min-h-0">
              <UltraMinimalChart
                title="Net Worth"
                data={chartData.netWorthData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
