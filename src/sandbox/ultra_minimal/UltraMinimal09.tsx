import { ResponsiveLine } from '@nivo/line'
import { loanChartData, investmentValueData } from '../data'

const UltraMinimal09 = () => {
  return (
    <div className="h-80">
      <h3 className="text-lg font-semibold text-[#E8E2F4] mb-2">09 - Aurora</h3>
      <p className="text-sm text-[#6B6483] mb-2">Emerald + violet</p>
      <div className="h-64">
        <ResponsiveLine
          data={[loanChartData, investmentValueData]}
          margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'linear', min: 0, max: 'auto' }}
          yScale={{ type: 'linear', min: 0, max: 'auto' }}
          curve="basis"
          enableArea={true}
          areaOpacity={0.08}
          pointSize={0}
          lineWidth={2}
          useMesh={true}
          enableSlices="x"
          enableGridX={false}
          enableGridY={false}
          theme={{
            background: '#1E1A2E',
            text: { fill: '#A9A1C1' },
            axis: {
              ticks: { text: { fill: '#6B6483' } },
              legend: { text: { fill: '#A9A1C1' } },
              domain: { line: { stroke: '#3D3554' } },
            },
            crosshair: { line: { stroke: '#A9A1C1', strokeOpacity: 0.5 } },
            tooltip: { container: { background: '#171421', color: '#A9A1C1' } },
          }}
          colors={['#10B981', '#8B5CF6']}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 100,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: '#6B6483',
              symbolSize: 10,
              symbolShape: 'circle',
            },
          ]}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            legend: 'Year',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            legend: 'Amount ($)',
            legendOffset: -50,
            legendPosition: 'middle',
            format: (v) => `${Number(v) / 1000}k`,
          }}
        />
      </div>
    </div>
  )
}

export default UltraMinimal09
