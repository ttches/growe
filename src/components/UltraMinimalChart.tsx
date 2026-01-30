import { ResponsiveLine } from "@nivo/line";

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
};

const UltraMinimalChart = ({
  title,
  data,
  colors = ["#C792EA", "#89DDFF"],
}: UltraMinimalChartProps) => {
  return (
    <div className="h-full flex">
      <div className="flex items-center justify-center w-8">
        <h3 className="text-lg font-semibold text-[#A9A1C1] -rotate-90 whitespace-nowrap">
          {title}
        </h3>
      </div>
      <div className="flex-1">
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
          xScale={{ type: "linear", min: 0, max: "auto" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          curve="basis"
          enableArea={false}
          areaOpacity={0.04}
          pointSize={0}
          lineWidth={2}
          useMesh={true}
          enableCrosshair={true}
          crosshairType="bottom-left"
          enableGridX={false}
          enableGridY={false}
          theme={{
            background: "#1E1A2E",
            text: { fill: "#A9A1C1" },
            axis: {
              ticks: { text: { fill: "#6B6483" } },
              legend: { text: { fill: "#A9A1C1" } },
              domain: { line: { stroke: "#3D3554" } },
            },
            crosshair: { line: { stroke: "#A9A1C1", strokeOpacity: 0.5 } },
            tooltip: { container: { background: "#171421", color: "#A9A1C1" } },
          }}
          colors={colors}
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
            legend: "Year",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            legend: "Amount ($)",
            legendOffset: -50,
            legendPosition: "middle",
            format: (v) => `${Number(v) / 1000}k`,
          }}
        />
      </div>
    </div>
  );
};

export default UltraMinimalChart;
