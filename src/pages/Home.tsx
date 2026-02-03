import InputSection from "../components/InputSection";
import UltraMinimalChart from "../components/UltraMinimalChart";
import HoverPanel from "../components/HoverPanel";
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
    <div className="h-screen bg-[#15152a] overflow-hidden">
      <div className="h-full mx-auto px-4 py-8">
        <div className="h-full grid grid-cols-[1fr_3fr_1fr] gap-8">
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
            <div className="bg-[#191831] rounded-xl border border-[#3D3554] p-6 space-y-4">
              <div>
                <label
                  htmlFor="additionalPayments"
                  className="block text-sm font-medium text-[#a196e4] mb-1"
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
                    className="w-full px-3 py-2 bg-[#15152a] border border-[#3D3554] rounded-lg text-[#fad003] placeholder-[#6B6483] focus:ring-2 focus:ring-[#d971d5] focus:border-[#d971d5] outline-none transition-colors"
                  />
                  <input
                    type="checkbox"
                    checked={additional.enabled}
                    onChange={(e) => additional.setEnabled(e.target.checked)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 accent-[#d971d5] cursor-pointer"
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
              <label className="block text-sm font-medium text-[#a196e4] mb-2">
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
                yMin={chartData.netWorthYMin}
              />
            </div>
          </div>

          <div className="pt-6">
            <HoverPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
