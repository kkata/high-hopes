import { useState, useEffect } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheetRowType } from "../types";

const CLIENT_EMAIL = import.meta.env.VITE_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.VITE_GOOGLE_SERVICE_PRIVATE_KEY || "";

const jwt = new JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const fetchSpreadsheetData = async (sheetName: string) => {
  const doc = new GoogleSpreadsheet(
    import.meta.env.VITE_SPREADSHEET_ID || "",
    jwt
  );

  await doc.loadInfo();

  const sheet = doc.sheetsByTitle[sheetName];
  const rows = await sheet.getRows<GoogleSpreadsheetRowType>();
  return rows.map((row) => row.toObject()) as GoogleSpreadsheetRowType[];
};

export const useSpreadsheet = (sheetName: string) => {
  const [data, setData] = useState<GoogleSpreadsheetRowType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchSpreadsheetData(sheetName).then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, [sheetName]);

  return { data, isLoading };
};
