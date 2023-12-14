import React from "react";
import Select, { StylesConfig } from "react-select";
import { useField, ErrorMessage } from "formik";

interface SelectProps {
  label: string;
  name: string;
  options: any[]; // Replace 'any' with the type of your options array
  defaultValue?: any;
  isSearchable?: boolean;
  placeholder?: string;
  onChange: (value: any) => void;
  formatOptionLabel?: (option: any) => React.ReactNode;
  onBlur?: () => void;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string;
  noOptionsMessage: () => string;
  disabled?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
}

const CustomSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  defaultValue,
  getOptionLabel,
  getOptionValue,
  formatOptionLabel,
  isSearchable = false,
  placeholder,
  onChange,
  onBlur,
  noOptionsMessage,
  disabled,
  isLoading = false,
  isMulti = false,
}) => {
  const [, , helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const handleSelectChange = (selectedOption: any) => {
    setValue(selectedOption);
    onChange(selectedOption);
  };
  const handleBlur = () => {
    setTouched(true);
    onBlur && onBlur();
  };
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const customStyles = (): StylesConfig => ({
    control: (base, state) => ({
      ...base,
      background: "transparent", // Set background color to black for the dark theme
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: "transparent",
      color: "transparent",
      padding: 2,
      fontWeight: "500",
    }),
    menu: (base) => ({
      ...base,
      color: "transparent",
      background: "transparent",
      fontWeight: "500",
    }),
    menuList: (base) => ({
      ...base,
      background: "transparent", // Set background color to black for the dark theme
      color: "transparent",
      fontWeight: "500",
    }),
    option: (base) => ({
      ...base,
      background: "transparent",
      color: "transparent",
      fontWeight: "500",
    }),
    multiValue: (base) => ({
      ...base,
      background: "#00BA63 ",
      color: "white", // You can set the text color to be light for both themes
    }),
    singleValue: (base) => ({
      ...base,
      color: "black", // Set the text color for the selected value
    }),
  });

  return (
    <div className="w-full">
      <label
        className={` block 
       font-medium
       leading-3
       capitalize
       text-sm mb-1.5
     `}
      >
        {label}
      </label>
      <div className="mt-1">
        <Select
          // {...field}
          name={name}
          options={options}
          isMulti={isMulti}
          defaultValue={defaultValue}
          isSearchable={isSearchable}
          placeholder={placeholder}
          styles={customStyles()}
          onChange={handleSelectChange}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          onBlur={handleBlur}
          className="w-full font-medium"
          noOptionsMessage={noOptionsMessage}
          isDisabled={disabled}
          isLoading={isLoading}
          formatOptionLabel={formatOptionLabel}
          // isClearable={true}
        />
        <ErrorMessage
          name={name}
          component="div"
          className={"text-xs capitalize text-red-500"}
        />
      </div>
    </div>
  );
};

export default CustomSelect;
