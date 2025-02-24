import { View, TouchableOpacity, Text } from "react-native";
import { RadioButtonProps } from "./RadioButtonProps";
import styles from "./Styles";

export default function RadioButton({
  option,
  label,
  selected,
  onPress
}: RadioButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
        onPress={onPress}
      >
        <View style={styles.radio}>
          {selected ? <View style={styles.radioSelected} /> : null}
        </View>
        <View>
          <Text style={styles.labelText}>{label}</Text>
          <Text style={styles.optionText}>{option}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}