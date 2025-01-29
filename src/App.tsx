import React, { FC, useState, ChangeEvent } from "react";

type ParamType = "string" | "number" | "select";

interface Param {
  id: number;
  name: string;
  type?: ParamType;
  options?: string[];
}

interface Model {
  paramValues: { [paramId: number]: string };
}

interface ParamEditorProps {
  params: Param[];
  model: Model;
}

const ParamEditor: FC<ParamEditorProps> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<{ [key: number]: string }>(
    () => model.paramValues
  );

  const handleInputChange = (
    paramId: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setParamValues({
      ...paramValues,
      [paramId]: e.target.value,
    });
  };

  const renderInput = (param: Param) => {
    const { id, type, options } = param;
    const inputProps = {
      value: paramValues[id] || "",
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        handleInputChange(id, e),
    };

    if (type === "select" && options) {
      return (
        <select {...inputProps}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return <input type={type ?? "text"} {...inputProps} />;
  };

  return (
    <form>
      {params.map((param) => (
        <div key={param.id} style={{ marginBottom: "10px" }}>
          <label>{param.name}:</label>
          {renderInput(param)}
        </div>
      ))}
    </form>
  );
};

const App: FC = () => {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model: Model = {
    paramValues: {
      1: "повседневное",
      2: "макси",
    },
  };

  return <ParamEditor model={model} params={params} />;
};

export default App;
