import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 15,
    marginLeft: 25,
    marginRight: 25,
    borderWidth: 1,
    borderRadius: 15,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  labelText: {
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5,
  },
  optionText: {
    marginLeft: 15,
  },
});

export default styles;
