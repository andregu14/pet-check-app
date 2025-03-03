import { Text, TouchableOpacity, TouchableHighlight, View } from "react-native";
import { ButtonProps, HighlightButtonProps } from "./ButtonProps";
import styles from "./Styles";

export const OpacityButton = ({
  label,
  style,
  styleDisabled,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <View style={style}>
      <TouchableOpacity
        style={[styles.button, style, disabled && styleDisabled]}
        activeOpacity={0.5}
        disabled={disabled}
        {...props}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const HighlightButton = ({
  label,
  onPress,
  style,
  altStyle,
  buttonStyle,
}: HighlightButtonProps) => {
  return (
    <View style={style}>
      <TouchableHighlight
        style={[altStyle ? styles.buttonAlt : styles.button, buttonStyle]}
        underlayColor={altStyle ?"rgba(138, 139, 139, 0.2)" : "rgb(19, 81, 126)"}
        onPress={onPress}
      >
        <Text style={altStyle ? styles.buttonTextAlt : styles.buttonText}>
          {label}
        </Text>
      </TouchableHighlight>
    </View>
  );
};
