import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import Toast from "react-native-toast-message";

export const toastConfig = {
  error: ({ text1, text2 }: any) => (
    <View
      style={{
        backgroundColor: "red",
        padding: 15,
        borderRadius: 10,
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MaterialIcons name="error-outline" size={24} color="white" />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>{text1}</Text>
        <Text style={{ color: "white" }}>{text2}</Text>
      </View>
    </View>
  ),
  success: ({ text1, text2 }: any) => (
    <View
      style={{
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 10,
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MaterialIcons name="check-circle-outline" size={24} color="white" />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>{text1}</Text>
        <Text style={{ color: "white" }}>{text2}</Text>
      </View>
    </View>
  ),
};

export default Toast;
