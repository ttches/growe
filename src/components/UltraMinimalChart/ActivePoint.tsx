import { useEffect, useRef } from "react";
import type { LineCustomSvgLayerProps, LineSeries } from "@nivo/line";
import { useCashflowContext, type HoveredPoint } from "../../context/CashflowContext";

type ActivePointProps<S extends LineSeries> = LineCustomSvgLayerProps<S>;

const ActivePoint = <S extends LineSeries>({
  currentSlice,
  pointSize,
}: ActivePointProps<S>) => {
  const { setHoveredPoints } = useCashflowContext();
  const prevSliceId = useRef<string | null>(null);

  useEffect(() => {
    const sliceId = currentSlice?.id ?? null;
    if (sliceId !== prevSliceId.current) {
      prevSliceId.current = sliceId;
      if (currentSlice?.points) {
        const points: HoveredPoint[] = currentSlice.points.map((point) => ({
          x: point.data.x as number,
          serieId: String(point.seriesId),
          value: point.data.y as number,
          color: point.color,
        }));
        setHoveredPoints(points);
      } else {
        setHoveredPoints(null);
      }
    }
  }, [currentSlice, setHoveredPoints]);

  if (!currentSlice) return null;

  const size = pointSize ?? 10;

  return (
    <g>
      {currentSlice.points.map((point) => (
        <circle
          key={point.id}
          cx={point.x}
          cy={point.y}
          r={size / 2}
          fill={point.color}
          stroke={point.color}
          strokeWidth={2}
          style={{ pointerEvents: "none" }}
        />
      ))}
    </g>
  );
};

export default ActivePoint;
