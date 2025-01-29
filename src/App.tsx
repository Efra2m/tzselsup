import React, { FC, useState, ChangeEvent } from "react";

type ParamType = "string" | "number" | "select";

interface Param {
  id: number;
  name: string;
  type?: ParamType;
  options?: string[];
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface ParamEditorProps {
  params: Param[];
  model: Model;
}

const ParamEditor: FC<ParamEditorProps> = ({ params, model }) => {
  const [value, setValue] = useState<{ [key: number]: string }>(() =>
    params.reduce<{ [key: number]: string }>((acc, param) => {
      const foundValue = model.paramValues.find(
        (pv) => pv.paramId === param.id
      );
      acc[param.id] = foundValue ? foundValue.value : "";
      return acc;
    }, {})
  );

  const handleChange = (paramId: number, value: string) => {
    setValue((prevValues) => ({
      ...prevValues,
      [paramId]: value,
    }));
  };

  const handleInputChange = (
    paramId: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleChange(paramId, e.target.value);
  };

  const renderInput = (param: Param) => {
    const inputProps = {
      value: value[param.id] || "",
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        handleInputChange(param.id, e),
    };

    switch (param.type) {
      case "string":
        return <input type="text" {...inputProps} />;
      case "number":
        return <input type="number" {...inputProps} />;
      case "select":
        return (
          <select {...inputProps}>
            {param.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <form>
      <div>
        {params.map((param) => (
          <div key={param.id} style={{ marginBottom: "10px" }}>
            <label>{param.name}:</label>
            {renderInput(param)}
          </div>
        ))}
      </div>
    </form>
  );
};

const App: FC = () => {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
  };

  return <ParamEditor model={model} params={params} />;
};

export default App;
