import { useCashflowContext } from "../context/CashflowContext";

const formatValue = (value: number) => {
  if (Math.abs(value) >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value.toFixed(0)}`;
};

const HoverPanel = () => {
  const { hoveredPoints } = useCashflowContext();

  if (!hoveredPoints) {
    return <div></div>;
  }

  const year = hoveredPoints[0]?.x;

  return (
    <div className="space-y-4">
      <div className="text-[#a196e4] text-lg font-medium">Year {year}</div>
      <div className="space-y-2">
        {hoveredPoints.map((point) => (
          <div key={point.serieId} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: point.color }}
            />
            <span className="text-[#6B6483] text-sm">{point.serieId}:</span>
            <span className="text-[#a196e4] text-sm font-medium">
              {formatValue(point.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoverPanel;
