import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Brush,
} from "recharts";

import { useSpreadsheetData } from "../hooks/useSpreadsheetData";
import { GoogleSpreadsheetRowType } from "../types";

export const Charts = () => {
  const { data }: { data: GoogleSpreadsheetRowType[] } = useSpreadsheetData();

  if (!data.length) return <div>Loading...</div>;

  const currentWeight = data.slice(-1)[0].体重;
  const currentBodyBatPercentage = data.slice(-1)[0].体脂肪率;
  const currentMuscleMass = data.slice(-1)[0].筋肉量;

  return (
    <div>
      <LineChart
        width={1100}
        height={250}
        data={data}
        syncId="anyId"
        margin={{
          top: 30,
          right: 0,
          left: 30,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          type="number"
          domain={["dataMin - 1", "dataMax + 1"]}
          unit="kg"
        />
        <Tooltip />
        <Legend />
        <ReferenceLine
          y={currentWeight}
          label={"現在 " + currentWeight + "kg"}
          stroke="#ff70ea"
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="体重"
          unit="kg"
          stroke="#8884d8"
          dot={false}
          activeDot={{ r: 8 }}
        />
        {/* not working correctly ref. https://github.com/recharts/recharts/issues/2479 */}
        {/* <Brush /> */}
      </LineChart>
      <LineChart
        width={1100}
        height={250}
        data={data}
        syncId="anyId"
        margin={{
          top: 30,
          right: 0,
          left: 30,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis type="number" domain={["dataMin - 1", "dataMax + 1"]} unit="%" />
        <Tooltip />
        <Legend />
        <ReferenceLine
          y={currentBodyBatPercentage}
          label={"現在 " + currentBodyBatPercentage + "%"}
          stroke="#ff70ea"
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="体脂肪率"
          unit="%"
          stroke="#82ca9d"
          dot={false}
          activeDot={{ r: 8 }}
        />
      </LineChart>
      <LineChart
        width={1100}
        height={250}
        data={data}
        syncId="anyId"
        margin={{
          top: 30,
          right: 0,
          left: 30,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          type="number"
          domain={["dataMin - 1", "dataMax + 1"]}
          unit="kg"
        />
        <Tooltip />
        <Legend />
        <ReferenceLine
          y={currentMuscleMass}
          label={"現在 " + currentMuscleMass + "kg"}
          stroke="#ff70ea"
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="筋肉量"
          unit="kg"
          stroke="#34ebeb"
          dot={false}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};
