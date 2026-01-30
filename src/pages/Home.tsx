import InputSection from "../components/InputSection";
import UltraMinimalChart from "../components/UltraMinimalChart";
import { useLoan } from "../hooks/useLoan";
import { useInvestment } from "../hooks/useInvestment";
import { useAdditionalFunds } from "../hooks/useAdditionalFunds";
import { useTimeHorizon } from "../hooks/useTimeHorizon";
import { useChartData } from "../hooks/useChartData";

const Home = () => {
  const loan = useLoan();
  const investment = useInvestment();
  const additional = useAdditionalFunds();
  const timeHorizon = useTimeHorizon();
  const chartData = useChartData();

  return (
    <div className="h-screen bg-[#171421] overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-4 py-8">
        <div className="h-full grid grid-cols-[1fr_3fr] gap-8">
          <div className="space-y-6 overflow-y-auto">
            <InputSection
              fields={loan.fields}
              values={loan.values}
              onChange={loan.onChange}
              rightContent={
                additional.extraToLoan > 0
                  ? { loanPayment: `+ $${Math.round(additional.extraToLoan)}` }
                  : undefined
              }
            />
            <InputSection
              fields={investment.fields}
              values={investment.values}
              onChange={investment.onChange}
              rightContent={
                additional.extraToInvest > 0
                  ? {
                      monthlyContribution: `+ $${Math.round(additional.extraToInvest)}`,
                    }
                  : undefined
              }
            />
            <div className="bg-[#1E1A2E] rounded-xl border border-[#3D3554] p-6 space-y-4">
              <div>
                <label
                  htmlFor="additionalPayments"
                  className="block text-sm font-medium text-[#A9A1C1] mb-1"
                >
                  Additional Payments
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="additionalPayments"
                    value={additional.amount}
                    onChange={(e) => additional.setAmount(e.target.value)}
                    placeholder={additional.placeholder}
                    className="w-full px-3 py-2 bg-[#171421] border border-[#3D3554] rounded-lg text-[#fad003] placeholder-[#6B6483] focus:ring-2 focus:ring-[#C792EA] focus:border-[#C792EA] outline-none transition-colors"
                  />
                  <input
                    type="checkbox"
                    checked={additional.enabled}
                    onChange={(e) => additional.setEnabled(e.target.checked)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 accent-[#C792EA] cursor-pointer"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={additional.splitPercent}
                onChange={(e) =>
                  additional.setSplitPercent(Number(e.target.value))
                }
                className="w-full accent-[#fad003]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A9A1C1] mb-2">
                Time Horizon: {timeHorizon.years} years
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={timeHorizon.years}
                onChange={(e) => timeHorizon.setYears(Number(e.target.value))}
                className="w-full accent-[#fad003]"
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
