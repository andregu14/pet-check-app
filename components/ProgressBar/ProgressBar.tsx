import { View, StyleSheet, Pressable } from "react-native";

type ProgressBarProps = {
  style?: {};
  disabled?: boolean;
  onPress?: () => void
};

export default function ProgressBar({ style, disabled , onPress }: ProgressBarProps) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[styles.container, style, disabled ? styles.disabled : undefined]}
      ></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 7,
    width: 80,
    borderRadius: 10,
    backgroundColor: "#1A00AA",
  },
  disabled: {
    backgroundColor: "#D9D9D9",
  },
});
