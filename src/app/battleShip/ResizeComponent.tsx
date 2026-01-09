// purpose:
// two inputs: number for size row * column, ships < size
// button start/reset
import "./ResizeComponent.css";
import React, { useCallback, useEffect, useState } from "react";
import {
  LabelInputComponent,
  ButtonComponent,
  CenterCardComponent,
  SectionComponent,
} from "../commons/common.components";

type StatusType = "Start" | "Reset";

const ResizeComponent = ({ resize }) => {
  const [size, setSize] = useState<number>(5);
  const [ships, setShips] = useState<number>(5);
  const [status, setStatus] = useState<StatusType>("Start");

  const handleClick = useCallback(() => {
    resize(size, ships);
    setStatus("Reset");
  }, [size, ships]);

  return (
    <SectionComponent>
      <CenterCardComponent id="resize_setting_1">
        <LabelInputComponent
          labelData={{
            id: "label-matrix-size-input",
            htmlFor: "matrix-size-input",
            content: "Size (rows = columns):",
          }}
          inputData={{ id: "matrix-size-input", type: "number", value: size }}
          onChange={setSize}
        ></LabelInputComponent>
        <LabelInputComponent
          labelData={{
            id: "label-ships-input",
            htmlFor: "ships-input",
            content: "Ships:",
          }}
          inputData={{ id: "ships-input", type: "number", value: ships }}
          onChange={setShips}
        ></LabelInputComponent>
      </CenterCardComponent>

      <CenterCardComponent id="resize_setting_3">
        <ButtonComponent
          id="start-rest-btn"
          content={status}
          onClick={handleClick}
        ></ButtonComponent>
      </CenterCardComponent>
    </SectionComponent>
  );
};

export default ResizeComponent;
