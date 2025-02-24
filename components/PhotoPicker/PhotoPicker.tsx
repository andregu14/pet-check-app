import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

type PhotoPickerProps = {
  onPress?: () => void;
  image?: string | undefined;
  label: string
};

export default function PhotoPicker({ onPress, image, label }: PhotoPickerProps) {
    
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {!image ? (
          <View style={styles.photoAddContainer}>
            <MaterialIcons name="add-a-photo" size={25} />
          </View>
        ) : (
          <Image style={styles.photoAddContainer} source={{ uri: image }} />
        )}
      </TouchableOpacity>
      <Text style={styles.textLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  photoAddContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  textLabel: {
    fontWeight: "bold",
  },
});
