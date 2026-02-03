import { ResponsiveLine, type LineSvgLayer, type LineSeries } from "@nivo/line";
import ActivePoint from "./ActivePoint";

type ChartDataPoint = {
  x: number;
  y: number;
};

type ChartSeries = {
  id: string;
  data: ChartDataPoint[];
};

type UltraMinimalChartProps = {
  title: string;
  data: ChartSeries[];
  colors?: string[];
  yMin?: number;
};

const UltraMinimalChart = ({
  title,
  data,
  colors = ["#d971d5", "#9fffff"],
  yMin = 0,
}: UltraMinimalChartProps) => {
  return (
    <div className="h-full cursor-crosshair">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        yScale={{ type: "linear", min: yMin, max: "auto" }}
        curve="basis"
        enableArea={false}
        areaOpacity={0.04}
        pointSize={10}
        lineWidth={2}
        useMesh={true}
        enableSlices="x"
        sliceTooltip={() => null}
        enableGridX={false}
        enableGridY={false}
        theme={{
          background: "#191831",
          text: { fill: "#a196e4" },
          axis: {
            ticks: { text: { fill: "#6B6483", fontSize: 12 } },
            domain: { line: { stroke: "#3D3554" } },
            legend: { text: { fill: "#a196e4", fontSize: 18 } },
          },
          crosshair: { line: { stroke: "#d971d5" } },
          tooltip: {
            container: {
              background: "#15152a",
              color: "#a196e4",
              borderRadius: "8px",
            },
          },
        }}
        colors={colors}
        layers={
          [
            "grid",
            "axes",
            "areas",
            "lines",
            "crosshair",
            "slices",
            ActivePoint,
            "mesh",
            "legends",
          ] as LineSvgLayer<LineSeries>[]
        }
        legends={[
          {
            anchor: "top-left",
            direction: "row",
            translateY: -15,
            itemWidth: 120,
            itemHeight: 20,
            itemTextColor: "#6B6483",
            symbolSize: 10,
            symbolShape: "circle",
          },
        ]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          legend: title,
          legendOffset: -50,
          legendPosition: "middle",
          format: (v) => `${Number(v) / 1000}k`,
        }}
      />
    </div>
  );
};

export default UltraMinimalChart;
