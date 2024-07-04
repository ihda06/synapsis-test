import Select from "react-select";

type Option = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: Option[];
  onChange?: (option: Option | null) => void;
  value?: Option;
  menuPlacement?: "top" | "bottom";
};
export default function CustomSelect({
  options,
  onChange,
  value,
  menuPlacement = "bottom",
}: SelectProps) {
  return (
    <Select
      options={options}
      onChange={(e) => onChange?.(e)}
      value={value}
      classNames={{
        control: () => "dark:text-white",
        input: () => "dark:placeholder:text-white dark:text-white ",
        option: () => "dark:hover:bg-slate-700 cursor-pointer",
        menuList: () => "dark:bg-neutral-800   ",
      }}
      menuPlacement={menuPlacement}
    />
  );
}
