import { TextInputProps } from "react-native";

export type DatePickerProps = {
    label: string;
    placeholder: string;
    obrigatorio?: boolean;
    onChange: (date: Date | null) => void;
    value: Date | null;
  } & Pick<TextInputProps, "onFocus" | "onBlur">;
  