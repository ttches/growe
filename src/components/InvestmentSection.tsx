import LabeledInput from "./LabeledInput";
import { useInvestment } from "../hooks/useInvestment";
import { useAdditionalFunds } from "../hooks/useAdditionalFunds";

const InvestmentSection = () => {
  const { values, onChange } = useInvestment();
  const { extraToInvest } = useAdditionalFunds();

  return (
    <div className="bg-[#191831] rounded-xl border border-[#3D3554] p-6">
      <div className="space-y-4">
        <LabeledInput
          label="Initial Investment"
          name="initialAmount"
          value={values.initialAmount || ""}
          onChange={(v) => onChange("initialAmount", v)}
          placeholder="1000"
        />
        <LabeledInput
          label="Return Rate"
          name="returnRate"
          value={values.returnRate || ""}
          onChange={(v) => onChange("returnRate", v)}
          placeholder="7"
          suffix="%"
        />
        <LabeledInput
          label="Monthly Contribution"
          name="monthlyContribution"
          value={values.monthlyContribution || ""}
          onChange={(v) => onChange("monthlyContribution", v)}
          placeholder="300"
          rightContent={
            extraToInvest > 0 ? `+ $${Math.round(extraToInvest)}` : undefined
          }
        />
      </div>
    </div>
  );
};

export default InvestmentSection;
