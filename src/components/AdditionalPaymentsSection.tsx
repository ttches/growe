import { useAdditionalFunds } from "../hooks/useAdditionalFunds";

const AdditionalPaymentsSection = () => {
  const {
    amount,
    setAmount,
    enabled,
    setEnabled,
    splitPercent,
    setSplitPercent,
    placeholder,
    redirectAfterPayoff,
    setRedirectAfterPayoff,
  } = useAdditionalFunds();

  return (
    <div className="bg-[#191831] rounded-xl border border-[#3D3554] p-6 space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="additionalPayments"
            className="text-sm font-medium text-[#a196e4]"
          >
            Additional Payments
          </label>
          <button
            type="button"
            onClick={() => setRedirectAfterPayoff(!redirectAfterPayoff)}
            title="adds additional payments to investments after loan reaches 0"
            className={`text-xs px-2 py-0.5 border rounded cursor-pointer transition-colors ${
              enabled && redirectAfterPayoff
                ? "text-[#a6ff90] border-[#a6ff90] hover:text-[#7cc87c] hover:border-[#7cc87c]"
                : "text-[#6B6483] border-[#6B6483] hover:text-[#a196e4] hover:border-[#a196e4]"
            }`}
          >
            $$$
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            id="additionalPayments"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full px-3 py-2 bg-[#15152a] border border-[#3D3554] rounded-lg text-[#fad003] placeholder-[#6B6483] focus:ring-2 focus:ring-[#d971d5] focus:border-[#d971d5] outline-none transition-colors"
          />
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 accent-[#d971d5] cursor-pointer"
          />
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={splitPercent}
        onChange={(e) => setSplitPercent(Number(e.target.value))}
        className={`w-full accent-[#fad003] transition-opacity ${enabled ? "" : "opacity-50"}`}
      />
    </div>
  );
};

export default AdditionalPaymentsSection;
