import { TouchableOpacityProps, TouchableHighlightProps, StyleProp } from "react-native";
import { StyleProps } from "react-native-reanimated";

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
  buttonStyle?: StyleProps
}
