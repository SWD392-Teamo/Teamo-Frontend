import { Dropdown } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

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
  showSearch?: boolean;
}

const DropdownSelect: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  defaultValue,
  placeholder = 'Select an option',
  showSearch = false,
}) => {
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] =
    useState<DropdownOption[]>(options);

  // Update filtered options whenever search or options change
  useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [search, options]);

  return (
    <Dropdown
      className='dropdown--primary--item w-full max-w-xs'
      theme={{
        floating: {
          target: 'dropdown dropdown--primary--trigger focus:ring-0',
          content: 'dropdown dropdown--primary--menu',
        },
      }}
      value={value || defaultValue}
      label={
        value ? options.find((o) => o.value === value)?.label : placeholder
      }
    >
      <div className='p-2'>
        {showSearch && (
          <input
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none'
            autoFocus
          />
        )}

        <div className='max-h-60 overflow-y-auto'>
          {options.map((option) => (
            <Dropdown.Item
              key={option.value}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </div>
      </div>
    </Dropdown>
  );
};

export default DropdownSelect;
