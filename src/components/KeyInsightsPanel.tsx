import { useInsights } from "../hooks/useInsights";

const formatMoney = (value: number): string => {
  const abs = Math.abs(value);
  if (abs >= 1000000) return `$${(value / 1000000).toFixed(1)}m`;
  if (abs >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${Math.round(value)}`;
};

const formatMonths = (months: number): string => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years}.${Math.round((remainingMonths / 12) * 10)} yr`;
};

const formatPayoffDate = (payoffMonth: number | null): string => {
  if (payoffMonth === null) return "not paid off";
  const now = new Date();
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + payoffMonth);
  const month = payoffDate.toLocaleDateString("en-US", { month: "short" });
  return `${month} ${payoffDate.getFullYear()}`;
};

const InsightRow = ({
  label,
  value,
  arrow,
}: {
  label: string;
  value: string;
  arrow?: "up" | "down";
}) => (
  <div className="flex justify-between items-center">
    <span className="text-[#6B6483] text-sm">{label}</span>
    <span className="text-sm font-medium text-[#fad003] flex items-center gap-1">
      {value}
      {arrow && <span>{arrow === "up" ? "↑" : "↓"}</span>}
    </span>
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[#191831] rounded-lg border border-[#3D3554] p-3 space-y-2">
    <div className="text-[#a196e4] text-sm tracking-wide">{title}</div>
    {children}
  </div>
);

const KeyInsightsPanel = ({ className = "" }: { className?: string }) => {
  const insights = useInsights();

  return (
    <div className={`space-y-3 ${className}`}>
      {insights.hasComparison && (
        <Section title={`with +$${Math.round(insights.extraAmount)}/mo`}>
          {insights.timeSavedMonths > 0 && (
            <InsightRow
              label="time saved"
              value={formatMonths(insights.timeSavedMonths)}
              arrow="down"
            />
          )}
          {insights.interestSaved > 0 && (
            <InsightRow
              label="interest saved"
              value={formatMoney(insights.interestSaved)}
              arrow="down"
            />
          )}
          <InsightRow
            label="wealth gained"
            value={formatMoney(insights.wealthGained)}
            arrow="up"
          />
        </Section>
      )}

      <Section title={`at year ${insights.years}`}>
        <InsightRow
          label="net worth"
          value={formatMoney(insights.finalNetWorth)}
        />
        <InsightRow
          label="interest paid"
          value={formatMoney(insights.totalInterestPaid)}
        />
        <InsightRow
          label="appreciation"
          value={formatMoney(insights.appreciation)}
        />
        <InsightRow
          label="contributions"
          value={formatMoney(insights.totalContributions)}
        />
      </Section>

      <Section title="milestones">
        <InsightRow
          label="debt free"
          value={formatPayoffDate(insights.payoffMonth)}
        />
      </Section>
    </div>
  );
};

export default KeyInsightsPanel;
