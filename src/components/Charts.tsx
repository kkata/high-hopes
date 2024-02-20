import { useState, useEffect } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
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

const CLIENT_EMAIL = import.meta.env.VITE_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.VITE_GOOGLE_SERVICE_PRIVATE_KEY || "";

const jwt = new JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const Charts = () => {
  const [data, setData] = useState<GoogleSpreadsheetRowType[]>([]);

  useEffect(() => {
    const fetchSpreadsheetData = async () => {
      const doc = new GoogleSpreadsheet(
        import.meta.env.VITE_SPREADSHEET_ID || "",
        jwt
      );

      await doc.loadInfo();

      const sheet = doc.sheetsById[0];
      const rows = await sheet.getRows<GoogleSpreadsheetRowType>();
      const rowsObj = rows.map((row) => {
        return row.toObject();
      });
      setData(rowsObj);
    };

    fetchSpreadsheetData();
  }, []);

  if (!data.length) return <div>Loading...</div>;

  const currentWeight = data.slice(-1)[0].体重;
  const currentBodyBatPercentage = data.slice(-1)[0].体脂肪率;
  const currentMuscleMass = data.slice(-1)[0].筋肉量;

  return (
    <div>
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
          domain={["dataMin - 0.5", "dataMax + 0.5"]}
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
          domain={["dataMin - 2", "dataMax + 20"]}
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
    </div>
  );
};
