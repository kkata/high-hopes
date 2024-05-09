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
import { GoogleSpreadsheetRowType } from "../types";
import { SHEET_NAME_MONTH } from "../constants";

type ChartsProps = {
  data: GoogleSpreadsheetRowType[];
  period: string;
};

export const Charts = ({ data, period }: ChartsProps) => {
  const currentWeight = data.slice(-1)[0].体重;
  const currentBodyBatPercentage = data.slice(-1)[0].体脂肪率;
  const currentMuscleMass = data.slice(-1)[0].筋肉量;

  return (
    <>
      <LineChart
        width={1200}
        height={300}
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
          domain={["dataMin - 1.5", "dataMax + 1.5"]}
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
        <Brush />
      </LineChart>
      <LineChart
        width={1200}
        height={300}
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
          domain={["dataMin - 2", "dataMax + 18"]}
          unit="%"
        />
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
        width={1200}
        height={300}
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
    </>
  );
};
