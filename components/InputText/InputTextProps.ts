import { TextInputProps } from "react-native";

export type InputTextProps = TextInputProps & {
  label: string;
  placeholder: string;
  password?: boolean;
  style?: any;
  isfocused?: boolean;
  obrigatorio?: boolean
  date?: boolean
};
