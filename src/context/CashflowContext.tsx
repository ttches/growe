import { createContext, useState, useContext, type ReactNode } from "react";

export type HoveredPoint = {
  x: number;
  serieId: string;
  value: number;
  color: string;
};

type CashflowState = {
  loanValues: Record<string, string>;
  setLoanValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  investmentValues: Record<string, string>;
  setInvestmentValues: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  additionalAmount: string;
  setAdditionalAmount: React.Dispatch<React.SetStateAction<string>>;
  additionalEnabled: boolean;
  setAdditionalEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  splitPercent: number;
  setSplitPercent: React.Dispatch<React.SetStateAction<number>>;
  timeHorizon: number;
  setTimeHorizon: React.Dispatch<React.SetStateAction<number>>;
  hoveredPoints: HoveredPoint[] | null;
  setHoveredPoints: (points: HoveredPoint[] | null) => void;
  useMinPayment: boolean;
  setUseMinPayment: React.Dispatch<React.SetStateAction<boolean>>;
  redirectAfterPayoff: boolean;
  setRedirectAfterPayoff: React.Dispatch<React.SetStateAction<boolean>>;
};

const CashflowContext = createContext<CashflowState | null>(null);

export const CashflowProvider = ({ children }: { children: ReactNode }) => {
  const [loanValues, setLoanValues] = useState<Record<string, string>>({});
  const [investmentValues, setInvestmentValues] = useState<
    Record<string, string>
  >({});
  const [additionalAmount, setAdditionalAmount] = useState("");
  const [additionalEnabled, setAdditionalEnabled] = useState(true);
  const [splitPercent, setSplitPercent] = useState(50);
  const [timeHorizon, setTimeHorizon] = useState(10);
  const [hoveredPoints, setHoveredPoints] = useState<HoveredPoint[] | null>(null);
  const [useMinPayment, setUseMinPayment] = useState(false);
  const [redirectAfterPayoff, setRedirectAfterPayoff] = useState(true);

  return (
    <CashflowContext.Provider
      value={{
        loanValues,
        setLoanValues,
        investmentValues,
        setInvestmentValues,
        additionalAmount,
        setAdditionalAmount,
        additionalEnabled,
        setAdditionalEnabled,
        splitPercent,
        setSplitPercent,
        timeHorizon,
        setTimeHorizon,
        hoveredPoints,
        setHoveredPoints,
        useMinPayment,
        setUseMinPayment,
        redirectAfterPayoff,
        setRedirectAfterPayoff,
      }}
    >
      {children}
    </CashflowContext.Provider>
  );
};

export const useCashflowContext = () => {
  const context = useContext(CashflowContext);
  if (!context) {
    throw new Error(
      "useCashflowContext must be used within a CashflowProvider"
    );
  }
  return context;
};
