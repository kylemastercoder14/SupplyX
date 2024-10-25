"use client";

import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type Props = {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export const DynamicSelect = ({
  value = "",
  onChange,
  disabled,
  onCreate,
  options = [],
  placeholder,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const { theme } = useTheme();

  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value) || null;
  }, [options, value]);

  const handleCreate = (inputValue: string) => {
    if (onCreate) {
      onCreate(inputValue);
    }
  };

  return (
    <div className="flex items-start gap-2">
      <CreatableSelect
        isMulti={false}
        placeholder={placeholder}
        className="w-full"
        styles={{
          control: (base) => ({
            ...base,
            borderColor: isFocused
              ? theme === "dark"
                ? "#111"
                : "#111"
              : theme === "dark"
              ? "#111"
              : "#e2e8f0",
            backgroundColor: theme === "dark" ? "#111" : "#111",
            boxShadow: isFocused ? "0 0 0 1px #111" : "none",
            ":hover": {
              borderColor: theme === "dark" ? "#111" : "#111",
            },
            "::placeholder": {
              color: theme === "dark" ? "#fff" : "#fff",
            },
            color: theme === "dark" ? "#fff" : "#fff",
          }),
          option: (styles, { isFocused }) => ({
            ...styles,
            backgroundColor: isFocused ? "#111" : "#111",
            color: isFocused ? "#fff" : theme === "dark" ? "#fff" : "#fff",
          }),
        }}
        value={formattedValue}
        onChange={onSelect}
        options={options}
        onCreateOption={handleCreate}
        isDisabled={disabled}
        onFocus={() => setIsFocused(true)} // Set focus state to true
        onBlur={() => setIsFocused(false)} // Set focus state to false
      />
    </div>
  );
};
