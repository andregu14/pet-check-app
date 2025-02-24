import { TouchableOpacityProps, TouchableHighlightProps } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  label: string;
  styleDisabled?: {}
  disabled?: boolean
  altStyle?: boolean
};

export type HighlightButtonProps = TouchableHighlightProps & {
  label: string;
  styleDisabled?: {}
  disabled?: boolean
  altStyle?: boolean
}
