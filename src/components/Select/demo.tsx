import React from "react";
import Select, { Option } from "./select";

const SelectDemo: React.FC = () => {
  return (
    <div style={{ width: "200px", marginLeft: "20px" }}>
      <Select defaultValue="台湾">
        <Option value="aa">香港</Option>
        <Option disabled value="bb">
          澳门
        </Option>
        <Option value="cc">台湾</Option>
      </Select>
    </div>
  );
};

export default SelectDemo;
