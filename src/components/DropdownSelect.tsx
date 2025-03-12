import { Dropdown } from 'flowbite-react';
import React from 'react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  defaultValue?: string;
  placeholder?: string;
}

const DropdownSelect: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  defaultValue,
  placeholder = "Select an option"
}) => {
  return (
    <Dropdown
      className="dropdown--primary--item w-full max-w-xs"
      theme={{
        floating: {
          target: "dropdown dropdown--primary--trigger focus:ring-0",
          content: "dropdown dropdown--primary--menu",
        }
      }}
      value={value || defaultValue}
      label={value ? options.find(o => o.value === value)?.label : placeholder}
    >
      {options.map((option) => (
        <Dropdown.Item 
          key={option.value} 
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default DropdownSelect;