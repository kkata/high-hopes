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
  ResponsiveContainer,
} from "recharts";
import { GoogleSpreadsheetRowType } from "../types";

type ChartsProps = {
  data: GoogleSpreadsheetRowType[];
};

export const Charts = ({ data }: ChartsProps) => {
  const currentWeight = data.slice(-1)[0].体重;
  const currentBodyBatPercentage = data.slice(-1)[0].体脂肪率;
  const currentMuscleMass = data.slice(-1)[0].筋肉量;

  return (
    <>
      <ResponsiveContainer minWidth={800} height={300}>
        <LineChart data={data} syncId="anyId">
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
      </ResponsiveContainer>

      <ResponsiveContainer minWidth={800} height={300}>
        <LineChart data={data} syncId="anyId">
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
      </ResponsiveContainer>

      <ResponsiveContainer minWidth={800} height={300}>
        <LineChart data={data} syncId="anyId">
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
      </ResponsiveContainer>
    </>
  );
};
