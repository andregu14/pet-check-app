import { TextInputProps } from "react-native";

export type InputTextProps = TextInputProps & {
  label: string;
  placeholder: string;
  password?: boolean;
  style?: any;
  obrigatorio?: boolean;
  date?: boolean;
  refe?: any;
  errorMessage?: string;
  useValidation?: boolean;
  isValid?: boolean | null;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: any) => void;
};
