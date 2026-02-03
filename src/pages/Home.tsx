import UltraMinimalChart from "../components/UltraMinimalChart";
import HoverPanel from "../components/HoverPanel";
import LoanSection from "../components/LoanSection";
import InvestmentSection from "../components/InvestmentSection";
import AdditionalPaymentsSection from "../components/AdditionalPaymentsSection";
import { useTimeHorizon } from "../hooks/useTimeHorizon";
import { useChartData } from "../hooks/useChartData";

const Home = () => {
  const timeHorizon = useTimeHorizon();
  const chartData = useChartData();

  return (
    <div className="h-screen bg-[#15152a] overflow-hidden">
      <div className="h-full mx-auto px-4 py-8">
        <div className="h-full grid grid-cols-[1fr_3fr_1fr] gap-8">
          <div className="space-y-6 overflow-y-auto">
            <LoanSection />
            <InvestmentSection />
            <AdditionalPaymentsSection />
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
