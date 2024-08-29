import { useState } from "react";
import { useSpreadsheet } from "./hooks/useSpreadsheet";
import { Charts } from "./components/Charts";
import { RadioButtonGroup } from "./components/RadioButtonGroup";
import { SHEET_NAME_DAY, SHEET_NAME_MONTH } from "./constants";

const options = [SHEET_NAME_MONTH, "日"];

export const App = () => {
  const [currentOption, setCurrentOption] = useState(SHEET_NAME_MONTH);
  const { data, isLoading } = useSpreadsheet(
    currentOption === SHEET_NAME_MONTH ? SHEET_NAME_MONTH : SHEET_NAME_DAY
  );

  return (
    <>
      <RadioButtonGroup
        options={options}
        selectedOption={currentOption}
        onChange={(option) => {
          setCurrentOption(option);
        }}
      />

      {isLoading ? (
        <p style={{ margin: "1em" }}>Loading...</p>
      ) : (
        <Charts data={data} />
      )}
    </>
  );
};
