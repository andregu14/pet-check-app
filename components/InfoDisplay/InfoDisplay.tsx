import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

type InfoDisplayProps = {
  label: string;
  info: string;
  select?: boolean;
  date?: boolean;
};

export default function InfoDisplay({
  label,
  info,
  select,
  date,
}: InfoDisplayProps) {
  return (
    <View>
      <Text style={styles.txtLabel}>{label}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTxt}>{info}</Text>
        {select || date ? (
          <MaterialCommunityIcons
            name={select ? "chevron-down" : "calendar-blank-outline"}
            size={24}
            color="black"
            style={styles.iconStyle}
          />
        ) : undefined}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    backgroundColor: "rgba(210, 210, 210, 0.45)",
    borderColor: "rgb(175, 175, 175)",
  },
  infoTxt: {
    paddingRight: 10,
    fontSize: 14,
    marginLeft: 15,
    color: "rgba(0, 0, 0, 0.5)",
  },
  txtLabel: {
    marginLeft: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  iconStyle: {
    position: "absolute",
    right: 10,
  },
});
