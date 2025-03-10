import { TextInputProps } from "react-native";

export type DatePickerProps = {
    label: string;
    placeholder: string;
    obrigatorio?: boolean;
    onChange: (date: Date | null) => void;
    value: Date | null;
    errorMessage?: string
    isValid?: boolean | null
    useValidation?: boolean
  } & Pick<TextInputProps, "onFocus" | "onBlur">;
  