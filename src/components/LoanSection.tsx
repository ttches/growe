import LabeledInput from "./LabeledInput";
import { useLoan } from "../hooks/useLoan";
import { useAdditionalFunds } from "../hooks/useAdditionalFunds";

const LoanSection = () => {
  const { values, onChange, minPayment, useMinPayment, setUseMinPayment } =
    useLoan();
  const { extraToLoan } = useAdditionalFunds();

  const minToggle = (
    <button
      type="button"
      onClick={() => setUseMinPayment(!useMinPayment)}
      title="use minimum payment that would pay off interest without changing loan balance"
      className={`text-xs px-2 py-0.5 border rounded cursor-pointer transition-colors ${
        useMinPayment
          ? "text-[#d971d5] border-[#d971d5] hover:text-[#9fffff] hover:border-[#9fffff]"
          : "text-[#6B6483] border-[#6B6483] hover:text-[#e89de5] hover:border-[#e89de5]"
      }`}
    >
      ${Math.round(minPayment)}
    </button>
  );

  return (
    <div className="bg-[#191831] rounded-xl border border-[#3D3554] p-6">
      <div className="space-y-4">
        <LabeledInput
          label="Loan Amount"
          name="loanAmount"
          value={values.loanAmount || ""}
          onChange={(v) => onChange("loanAmount", v)}
          placeholder="50000"
          labelExtra={minToggle}
        />
        <LabeledInput
          label="Interest Rate"
          name="loanInterest"
          value={values.loanInterest || ""}
          onChange={(v) => onChange("loanInterest", v)}
          placeholder="6.5"
          suffix="%"
        />
        <LabeledInput
          label="Monthly Payment"
          name="loanPayment"
          value={values.loanPayment || ""}
          onChange={(v) => onChange("loanPayment", v)}
          placeholder="500"
          disabled={useMinPayment}
          rightContent={
            extraToLoan > 0 ? `+ $${Math.round(extraToLoan)}` : undefined
          }
        />
      </div>
    </div>
  );
};

export default LoanSection;
