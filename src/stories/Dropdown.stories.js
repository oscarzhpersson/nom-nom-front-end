import React, { useState } from "react";
import Dropdown from "@/components/dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
};

export const Basic = () => {
  const [selectedOption, setSelectedOption] = useState("Apple");
  const options = ["Apple", "Orange", "Banana", "Grape"];

  return (
    <div style={{ padding: "2rem" }}>
      <h3>Selected option: {selectedOption}</h3>
      <Dropdown
        options={options}
        selected={selectedOption}
        onChange={(newOption) => {
          setSelectedOption(newOption);
          console.log("Changed selection to:", newOption);
        }}
      />
    </div>
  );
};

export const EmptyDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div style={{ padding: "2rem" }}>
      <h3>No options provided</h3>
      <Dropdown
        options={[]}
        selected={selectedOption}
        onChange={(newOption) => {
          setSelectedOption(newOption);
          console.log("Changed selection to:", newOption);
        }}
      />
    </div>
  );
}; 