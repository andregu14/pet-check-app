import { ViewStyle } from "react-native";

export type SelectItem<T extends any> = {
  title: string;
  value: T | null;
};

export type SelectProps = {
  label: string;
  placeholder: string;
  data: SelectItem<string | number>[];
  obrigatorio?: boolean;
  style?: ViewStyle;
  value?: any
  onSelect?: (value: any) => void
  errorTxt?: string | undefined | null
};